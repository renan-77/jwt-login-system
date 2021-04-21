from mongoengine import ObjectIdField, Document
from app import db


class User(Document):
    """ User class for declaring a model for User collection """
    _id = ObjectIdField()
    name = db.StringField()
    email = db.StringField(unique=True)
    password = db.StringField()
