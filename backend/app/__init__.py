from flask import Flask
from flask_restplus import Api
from flask_cors import CORS
from flask_mongoengine import MongoEngine
from config import Config
from flask_bcrypt import Bcrypt
from flask_session import Session

app = Flask(__name__)
app.config.from_object(Config)
api = Api(app=app, title='CRUD Api', doc='/api')
CORS(app, support_credentials=True)
db = MongoEngine(app=app)
bcrypt = Bcrypt(app=app)
session = Session(app=app)

from app import routes

if __name__ == '__main__':
    app.run()