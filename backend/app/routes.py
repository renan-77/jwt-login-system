from flask import jsonify
from flask_restplus import Resource
from app import api, password_encrypt, session
from app.models.user import User


@api.route('/user')
class UserAll(Resource):
    def get(self):
        return jsonify(User.objects.all())

    def post(self):
        try:
            data = api.payload

            # Encrypting plain password from request.
            data['password'] = password_encrypt.hash_password(data['password'])

            User(name=data['name'], email=data['email'], password=data['password']).save()
            return jsonify({'response': 'Successfully Registered'})

        except:
            return jsonify({'response': 'Sorry, an error has occurred'})


@api.route('/user/<user_email>')
class UserByEmail(Resource):

    # Function to check for user and it's password.
    def post(self, user_email):
        try:
            # Checking if user exists in database by email (defined as unique).
            if User.objects(email=user_email):
                data = api.payload

                print(data)
                # Checking if the password match with the one hashed on the db.
                if password_encrypt.compare_passwords(data['password'], User.objects(email=user_email)[0].password):
                    session['logged_in'] = True
                    return jsonify({'response': 'Login Successful', 'login': True})

                else:
                    return jsonify({'response': 'Wrong Password, Try Again', 'login': False})

            else:
                return jsonify({'response': 'Sorry, user does not exist', 'login': False})

        except:
            return jsonify({'response': 'Sorry, an error has occurred', 'login': False})
