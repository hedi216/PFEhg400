import bcrypt
from enum import Enum, unique
import mongoengine
from flask import session
from mongoengine.errors import ValidationError

class RoleEnum(Enum):
    ADMIN = "a"
    USER = "u"

class User(mongoengine.Document):

    fullName = mongoengine.StringField(required=True)
    position = mongoengine.StringField(required=True)
    email = mongoengine.EmailField(required=True, unique=True)
    password = mongoengine.StringField(required=True)
    phoneNumber = mongoengine.StringField(required=True)
    role = mongoengine.EnumField(
        RoleEnum, default=RoleEnum.USER)

    def hashPassword(self):
        self.password = bcrypt.hashpw(
            self.password.encode('utf-8'), bcrypt.gensalt()).decode("utf-8")

    def passwordIsCorrect(self, password):
        print(self.password)
        return bcrypt.checkpw(password.encode('utf-8'), self.password.encode('utf-8'))


class Concurrent(mongoengine.Document):
    poste_date= mongoengine.DateTimeField(required=True)
    post_text= mongoengine.StringField(required=True)
    nb_jaime= mongoengine.IntField(required=True)
    nb_commantaire= mongoengine.IntField(required=True)
    nb_partage= mongoengine.IntField(required=True)
    post_link= mongoengine.StringField(required=True)
    type= mongoengine.StringField(required=True)
    nom_concurent=mongoengine.StringField(required=True)


class Talan(mongoengine.Document):
    poste_date= mongoengine.DateTimeField(required=True)
    post_text= mongoengine.StringField(required=True)
    nb_jaime= mongoengine.IntField(required=True)
    nb_commantaire= mongoengine.IntField(required=True)
    nb_partage= mongoengine.IntField(required=True)
    post_link= mongoengine.StringField(required=True)
    type= mongoengine.StringField(required=True)
    #nom_concurent=mongoengine.StringField(required=True)

""" class CompetitorPosts(mongoengine.Document):
    poste_date= mongoengine.DateTimeField(required=True)
    post_text= mongoengine.StringField(required=True)
    nb_jaime= mongoengine.IntField(required=True)
    nb_commantaire= mongoengine.IntField(required=True)
    nb_partage= mongoengine.IntField(required=True)
    post_link= mongoengine.StringField(required=True)
    type= mongoengine.StringField(required=True) """

class competitor(mongoengine.Document):
    link_Site_web= mongoengine.StringField(required=True)
    Secteur= mongoengine.StringField(required=True)
    Siege_social= mongoengine.StringField(required=True)
    date_fondation= mongoengine.StringField(required=True)
    Specialisations= mongoengine.StringField(required=True)
    employes= mongoengine.StringField(required=True)
    nb_abonnee= mongoengine.StringField(required=True)
    nom_societe=mongoengine.StringField(required=True, unique=True)
    link_logo=mongoengine.StringField(required=True)

class Aregarder(mongoengine.Document):
    user = mongoengine.ReferenceField(User)
    post = mongoengine.ReferenceField(Concurrent)







        