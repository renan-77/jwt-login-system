from mongoengine import ObjectIdField, Document
from app import db


class <%= modelName %>(Document):
<%= fields %>
