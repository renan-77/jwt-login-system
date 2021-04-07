import unittest
import json
from app.models.user import User
from mongoengine import connect, disconnect
import app
from flask import jsonify
from app import password_encrypt

app.app.testing = True


class ApiResponseMock(object):
    """
    An object to define a standard API Response format.
    """
    def __init__(self, response):
        self.status_code = response.status_code
        self.data = response.data.decode()
        self.data_json = response.json
        try:
            self.message = response.json['message']
            self.login = response.json['login']
        except TypeError:
            print('Method get (does not return message/login)')
        except KeyError:
            print('User register has no \'login\' key')


class ExpectedResponse(object):
    """
    Defines an expected response from the API format.
    """
    def __init__(self, status_code, data):
        self.status_code = status_code
        self.data = data


class ApiTest(unittest.TestCase):
    """
    Class responsible for doing the tests.
    """
    def setUp(self):
        disconnect()
        # Creating connection to mock database using mongoengine
        connect('mongoenginetest', host='mongomock://localhost')

        # Creating mock data.
        User(name='user1', email='user1@dell.com', password=password_encrypt.hash_password('user1pass')).save()
        User(name='user2', email='user2@dell.com', password=password_encrypt.hash_password('user2pass')).save()
        User(name='user3', email='user3@dell.com', password=password_encrypt.hash_password('user3pass')).save()
        User(name='user4', email='user4@dell.com', password=password_encrypt.hash_password('user4pass')).save()

        self.userAll = app.routes.UserAll()
        self.userByEmail = app.routes.UserByEmail()

    def test_routes_user_all_get_success(self):
        """
        Testing the get method from API, making sure that what is in the database is the same as the API returns.
        """
        with app.app.app_context():
            # Creating expected response object.
            expected = ExpectedResponse(200, jsonify(User.objects.all()).data.decode())
            # Getting response from the API
            api_response = app.routes.UserAll.get(self.userAll)
            # Assigning API response relevant fields to an instance of the object
            response = ApiResponseMock(api_response)

            self.assertEqual(expected.data, response.data)
            self.assertEqual(expected.status_code, response.status_code)

    def test_routes_user_all_get_fail(self):
        """
        Testing the get method from API creating new register after getting the response from the API to make sure it
        isn't the same.
        """
        with app.app.app_context():
            # Getting response from the API
            api_response = app.routes.UserAll.get(self.userAll)
            # Assigning API response relevant fields to an instance of the object
            response = ApiResponseMock(api_response)
            User(name='user5', email='user5@dell.com', password=password_encrypt.hash_password('user5pass')).save()
            # Creating expected response object.
            expected = ExpectedResponse(200, jsonify(User.objects.all()).data.decode())

            self.assertNotEqual(expected.data, response.data)
            self.assertEqual(expected.status_code, response.status_code)

    def test_routes_user_all_post_success(self):
        """
        Testing if register of new user is successful through the API, new registered user is then checked in the
        database to see if the names match.
        """
        with app.app.test_client() as client:
            # Send data as POST form to endpoint
            user = {
                'name': 'testing',
                'email': 'testuser@dell.com',
                # Converting byte hash to str for formatting as json
                'password': str(password_encrypt.hash_password('testuserpassword'))
            }
            result = client.post(
                '/user',
                data=json.dumps(user),
                content_type='application/json'
            )
            # Creating expected response object.
            expected = ExpectedResponse(201, 'Successfully Registered')
            # Assigning API response relevant fields to an instance of the object
            response = ApiResponseMock(result)

            self.assertEqual(expected.data, response.message)
            self.assertEqual(expected.status_code, response.status_code)

    def test_routes_user_all_post_fail(self):
        """
        Testing for error when trying to register user with body missing information.
        """
        with app.app.test_client() as client:
            # Send data as POST form to endpoint, passing not enough data for api, expected error.
            user = {
                'name': 'testing',
                'email': 'testuser@dell.com'
            }
            result = client.post(
                '/user',
                data=json.dumps(user),
                content_type='application/json'
            )
            # Creating expected response object.
            expected = ExpectedResponse(406, 'Sorry, an error has occurred')
            # Assigning API response relevant fields to an instance of the object
            response = ApiResponseMock(result)

            self.assertEqual(expected.data, response.message)
            self.assertEqual(expected.status_code, response.status_code)

    def test_routes_user_by_email_login_success(self):
        """
        Testing for login successful.
        """
        with app.app.test_client() as client:
            # Send data as POST form to endpoint, passing not enough data for api, expected error.
            user = {
                'email': 'user1@dell.com',
                'password': 'user1pass'
            }
            result = client.post(
                '/login',
                data=json.dumps(user),
                content_type='application/json'
            )
            # Creating expected response object.
            expected = ExpectedResponse(201, 'Login Successful')
            # Assigning API response relevant fields to an instance of the object
            response = ApiResponseMock(result)

            self.assertEqual(expected.data, response.message)
            self.assertTrue(response.login)
            self.assertEqual(expected.status_code, response.status_code)

    def test_routes_user_by_email_login_fail_password(self):
        """
        Testing for login fail.
        """
        with app.app.test_client() as client:
            # Send data as POST form to endpoint, passing not enough data for api, expected error.
            user = {
                'email': 'user1@dell.com',
                'password': 'user1password'
            }
            result = client.post(
                '/login',
                data=json.dumps(user),
                content_type='application/json'
            )
            # Creating expected response object.
            expected = ExpectedResponse(401, 'Password is wrong!')
            # Assigning API response relevant fields to an instance of the object
            response = ApiResponseMock(result)

            # print('Error is:', result.json['error'])

            self.assertEqual(expected.data, response.message)
            self.assertFalse(response.login)
            self.assertEqual(expected.status_code, response.status_code)

    def test_routes_user_by_email_login_fail_email(self):
        """
        Testing for login fail.
        """
        with app.app.test_client() as client:
            # Send data as POST form to endpoint, passing not enough data for api, expected error.
            user = {
                'email': 'user190@dell.com',
                'password': 'user1password'
            }
            result = client.post(
                '/login',
                data=json.dumps(user),
                content_type='application/json'
            )
            # Creating expected response object.
            expected = ExpectedResponse(401, 'User does not exist')
            # Assigning API response relevant fields to an instance of the object
            response = ApiResponseMock(result)

            # print('Error is:', result.json['error'])

            self.assertEqual(expected.data, response.message)
            self.assertFalse(response.login)
            self.assertEqual(expected.status_code, response.status_code)

    def test_routes_user_by_email_post_bad_body(self):
        """
        Testing for login fail.
        """
        with app.app.test_client() as client:
            # Send data as POST form to endpoint, passing not enough data for api, expected error.
            user = {
                'email': 'user1@dell.com',
            }
            result = client.post(
                '/login',
                data=json.dumps(user),
                content_type='application/json'
            )
            # Creating expected response object.
            expected = ExpectedResponse(406, 'An error has occurred')
            # Assigning API response relevant fields to an instance of the object
            response = ApiResponseMock(result)

            # print('Error is:', result.json['error'])

            self.assertEqual(expected.data, response.message)
            self.assertFalse(response.login)
            self.assertEqual(expected.status_code, response.status_code)
