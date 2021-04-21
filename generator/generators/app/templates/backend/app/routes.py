from datetime import timedelta
from flask import jsonify, request, make_response
from flask_restplus import Resource
from app import api, password_encrypt, app
from app.models.user import User
from flask_jwt_extended import jwt_required, create_access_token


# Creating user route for get and post requests.
@api.route('/user')
class UserAll(Resource):
    """ Creating UserAll class inherited from resource to implement flask_restplus api functionality """
    def get(self):
        """
        Function to get all users in the database

        :return: Returns a json with all existing users from the database.
        """
        return make_response(jsonify(User.objects.all()), 200)

    def post(self):
        """
        Function to add new users on the

        :return: Response based on success of add.
        """
        try:
            # Assigning API payload to variable
            data = api.payload

            # Encrypting plain password from request.
            data['password'] = password_encrypt.hash_password(data['password'])

            # Adding new register to database
            User(name=data['name'], email=data['email'], password=data['password']).save()
            return make_response(jsonify(message='Successfully Registered'), 201)

        except:
            return make_response(jsonify(message='Sorry, an error has occurred'), 406)


# Creating login route for post request.
@api.route('/login')
class UserByEmail(Resource):
    """ UserByEmail inherits from Resource for usage of flask_restplus """

    # Function to check for user and it's password.
    def post(self):
        """
        Function that checks if the user login was successful (checks for user email and password) in case login is
        successful, a JWT Token is created and returned for that user.

        :return: Response and a login boolean based on success of login, if successful it will return a token as well
        as the response.
        """
        try:
            data = api.payload
            # Checking if user exists in database by email (defined as unique).
            if User.objects(email=data['email']):

                # Checking if the password match with the one hashed on the db.
                if password_encrypt.compare_passwords(data['password'], User.objects(email=data['email'])[0].password):

                    # Creating access token for user
                    access_token = create_access_token(expires_delta=timedelta(days=60), identity=data['email'])
                    return make_response(jsonify(message='Login Successful', login=True, access_token=access_token),
                                         201)

                else:
                    return make_response(jsonify(message='Password is wrong!', login=False), 401)

            else:
                return make_response(jsonify(message='User does not exist', login=False), 401)

        except Exception as e:
            return make_response(jsonify(message='An error has occurred', error=str(e), login=False), 406)
