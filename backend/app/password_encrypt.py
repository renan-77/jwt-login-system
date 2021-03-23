from app import bcrypt


def hash_password(password):
    hashed = bcrypt.generate_password_hash(password.encode('utf-8'))
    # Decoding from bytes to get a string.
    hashed = hashed.decode('utf-8')
    return hashed


def compare_passwords(password, hashed):
    # Encoding parameters to bytes for the 'checkpw' function.
    return bcrypt.check_password_hash(hashed.encode('utf-8'), password.encode('utf-8'))


if __name__ == '__main__':
    print(hash_password('password123'))
