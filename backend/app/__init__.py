from flask import Flask
from flask_restplus import Api
from flask_cors import CORS
from flask_mongoengine import MongoEngine
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
api = Api(app=app, title='CRUD Api', doc='/api')
CORS(app, support_credentials=True)
db = MongoEngine(app=app)

from app import routes

if __name__ == '__main__':
    app.run()