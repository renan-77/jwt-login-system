import unittest
import json
from app.routes import api
from app.models.user import User
from mongoengine import connect, disconnect
# import requests
from unittest.mock import Mock, patch
import app
from flask import jsonify


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
        User(name='user1', email='user1@dell.com', password='user1pass').save()
        User(name='user2', email='user2@dell.com', password='user2pass').save()
        User(name='user3', email='user3@dell.com', password='user3pass').save()
        User(name='user4', email='user4@dell.com', password='user4pass').save()

        self.userAll = app.routes.UserAll()
        self.userByEmail = app.routes.UserByEmail()

    def test_routes_get_success(self):
        """
        Testing the get method from API, making sure that what is in the database is the same as the API returns.
        """
        with app.app.app_context():
            expected = jsonify(User.objects.all()).data.decode()
            response = app.routes.UserAll.get(self.userAll).data.decode()

            self.assertEqual(expected, response)

    def test_routes_get_fail(self):
        """
        Testing the get method from API creating new register after getting the response from the API to make sure it
        isn't the same.
        """
        with app.app.app_context():
            response = app.routes.UserAll.get(self.userAll).data.decode()
            User(name='user5', email='user5@dell.com', password='user5pass').save()
            expected = jsonify(User.objects.all()).data.decode()

            self.assertNotEqual(expected, response)
