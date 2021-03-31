from flask import Flask
from flask_restplus import Api
from flask_cors import CORS
from flask_mongoengine import MongoEngine
from config import Config
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

app = Flask(__name__)  # Declaring a flask application.
app.config.from_object(Config)  # Implementing config from external file to application.
api = Api(app=app, title='CRUD Api', doc='/api')  # Declaring flask_restplus application and passing
CORS(app, support_credentials=True)  # Setting CORS to be allowed for api calls.
db = MongoEngine(app=app)  # Creating instance of MongoEngine library.
bcrypt = Bcrypt(app=app)  # Creating instance of bcrypt for encryption.
jwt = JWTManager(app=app)  # Creating instance of JWT for token management.

from app import routes  # Routes were declared in a different file, importing them for their usage.


# Checking if module is being called from main.
if __name__ == '__main__':
    app.run()