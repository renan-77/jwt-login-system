from mongoengine import ObjectIdField, Document
from app import db


class User(Document):
    _id = ObjectIdField()
    name = db.StringField()
    email = db.StringField(unique=True)
    password = db.StringField()
