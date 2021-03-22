from mongoengine import ObjectIdField, Document
from app import db


class User(Document):
    _id = ObjectIdField()
    name = db.StringField()
    email = db.StringField()
    password = db.StringField()