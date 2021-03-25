from flask import jsonify, request
from flask_restplus import Resource
from app import api, password_encrypt, session, app
from app.models.user import User
from flask_jwt_extended import jwt_required, create_access_token


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


@api.route('/login')
class UserByEmail(Resource):

    # Function to check for user and it's password.
    def post(self):
        try:
            data = api.payload
            # Checking if user exists in database by email (defined as unique).
            if User.objects(email=data['email']):

                # Checking if the password match with the one hashed on the db.
                if password_encrypt.compare_passwords(data['password'], User.objects(email=data['email'])[0].password):
                    # session['logged_in'] = True
                    access_token = create_access_token(identity=data['email'])
                    # print(access_token)
                    return jsonify(message='Login Successful', login=True, access_token=access_token)

                else:
                    return jsonify(message='Password is wrong!', login=False)

            else:
                return jsonify(message='User does not exist', login=False)

        except Exception as e:
            return jsonify(message='An error has occurred', error=str(e), login=False)


@app.route('/auth', methods=['GET'])
@jwt_required()
def auth():
    print(str(request.headers))
    return jsonify(login=True)
