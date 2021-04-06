import unittest
from app import password_encrypt


class AppTest(unittest.TestCase):
    """
    Class for testing password encrypt module.
    """
    def setUp(self):
        pass

    def test_hash_password_string(self):
        """
        Testing if the password as string is encrypted
        """
        result = password_encrypt.hash_password('&testingPassword@2021')
        self.assertNotEqual('&testingPassword@2021', result)

    def test_hash_password_byte(self):
        """
        Testing if the password as byte is encrypted
        """
        result = password_encrypt.hash_password(b'&testingPassword@2021')
        self.assertNotEqual(b'&testingPassword@2021', result)

    def test_hash_password_number(self):
        """
        Testing if the password as int is encrypted
        """
        result = password_encrypt.hash_password(1234567890)
        self.assertEqual('Please insert a string to continue', result)

    def test_compare_passwords_success(self):
        """
        Testing if the raw password matches the hashed password.
        """
        raw_password = '&testingPassword@2021'
        hashed = password_encrypt.hash_password(raw_password)
        result = password_encrypt.compare_passwords(raw_password, hashed)
        self.assertTrue(result)

    def test_compare_passwords_fail(self):
        """
        Testing if the raw password matches the hashed password.
        """
        raw_password = '&testingPassword@2021'
        hashed = password_encrypt.hash_password(raw_password)
        result = password_encrypt.compare_passwords('&anotherPassword@2021', hashed)
        self.assertFalse(result)

    def tearDown(self):
        pass


