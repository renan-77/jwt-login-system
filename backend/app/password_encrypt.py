from app import bcrypt


def hash_password(password):
    hashed = bcrypt.generate_password_hash(password)
    # Decoding from bytes to get a string.
    hashed = hashed
    return hashed


def compare_passwords(password, hashed):
    # Encoding parameters to bytes for the 'checkpw' function.
    return bcrypt.check_password_hash(hashed, password)


if __name__ == '__main__':
    print(hash_password('password123'))
