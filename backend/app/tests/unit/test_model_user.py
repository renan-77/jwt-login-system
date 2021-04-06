import unittest

import json
from app.models.user import User
from mongoengine import connect, disconnect


class AppTest(unittest.TestCase):
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

    def test_check_register(self):
        """
        Testing if the users registered on the database setup match what they should be.
        """
        self.assertEqual(User.objects.all()[0].name, 'user1')
        self.assertEqual(User.objects.all()[1].name, 'user2')
        self.assertEqual(User.objects.all()[2].name, 'user3')

    def test_new_register(self):
        """
        Testing if a new insert in the database matches what it should be.
        :return:
        """
        User(name='latestuser', email='latestuser@dell.com', password='latestuserpass').save()  # Adding new user.
        # Testing if last object registered has the same name as the one just added to it.
        self.assertEqual(list(User.objects.all())[-1].name, 'latestuser')



