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
    An object to define a standard API Response.
    """
    def __init__(self, status_code, response):
        self.status_code = status_code
        self.response = response
        self.text = str(json.dumps(response))


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
            expected = jsonify(User.objects.all()).data.decode()
            response = app.routes.UserAll.get(self.userAll).data.decode()

            self.assertEqual(expected, response)

    def test_routes_user_all_get_fail(self):
        """
        Testing the get method from API creating new register after getting the response from the API to make sure it
        isn't the same.
        """
        with app.app.app_context():
            response = app.routes.UserAll.get(self.userAll).data.decode()
            User(name='user5', email='user5@dell.com', password=password_encrypt.hash_password('user5pass')).save()
            expected = jsonify(User.objects.all()).data.decode()

            self.assertNotEqual(expected, response)

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
            # check result from server response.
            api_response = json.loads(result.data.decode())['response']

            self.assertEqual('Successfully Registered', api_response)
            # Testing if last object registered has the same name as the one just added to it.
            self.assertEqual(list(User.objects.all())[-1].name, 'testing')

    def test_routes_user_all_post_fail(self):
        """
        Testing for error when trying to register user with body missing information.
        """
        with app.app.test_client() as client:
            # Send data as POST form to endpoint, passing not enough data for api, expected error.
            user = {
                'name': 'testing',
                'email': 'testuser@dell.com',
            }
            result = client.post(
                '/user',
                data=json.dumps(user),
                content_type='application/json'
            )
            # Check result from server response.
            api_response = json.loads(result.data.decode())['response']
            self.assertEqual('Sorry, an error has occurred', api_response)

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
            # Check result from server response.
            api_response = json.loads(result.data.decode())['login']
            self.assertTrue(api_response)

    def test_routes_user_by_email_login_fail(self):
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
            # Check result from server response.
            api_response = json.loads(result.data.decode())['login']
            self.assertFalse(api_response)

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
            # Check result from server response.
            api_response = json.loads(result.data.decode())['login']
            self.assertFalse(api_response)