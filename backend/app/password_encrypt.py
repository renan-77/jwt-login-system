from app import bcrypt  # Importing bcrypt instance from app.


def hash_password(password):
    """
    Function that takes password as a parameter and returns the hashed password.

    :param str password:  A string password.
    """
    try:
        hashed = bcrypt.generate_password_hash(password)
        return hashed
    except TypeError:
        return 'Please insert a string to continue'


def compare_passwords(password, hashed):
    """
    Function to compare password with hash.

    :param str password:  A string password.
    :param str hashed: A string hashed password.
    :return: A boolean stating whether the password and hash match or not.
    """

    # Encoding parameters to bytes for the 'checkpw' function.
    return bcrypt.check_password_hash(hashed, password)


if __name__ == '__main__':
    print(hash_password('password123'))
