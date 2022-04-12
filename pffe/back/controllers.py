from flask_mail import Mail, Message
from flask import Flask
from re import X
from models import User,RoleEnum,competitor,Concurrent,Aregarder
from functools import wraps
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, get_jwt, verify_jwt_in_request
from datetime import datetime
import random
import string
app = Flask(__name__, template_folder="templates", static_folder="assets")

def admin_required():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            if claims["sub"]["isAdmin"]:
                return fn(*args, **kwargs)
            else:
                return jsonify(msg="Admins only!"), 403

        return decorator

    return wrapper


def login():
    email = request.json["email"]
    password = request.json["password"]
    user = User.objects.filter(email=email).only("fullName", "position","email","phoneNumber", "role", "password").first()
    print(user.role  == RoleEnum.ADMIN)
    if user and user.passwordIsCorrect(password):
        access_token = create_access_token(identity={"email":email, "isAdmin": user.role  == RoleEnum.ADMIN})
        return jsonify(user=user, access_token=access_token), 201
    else:
        return jsonify(message="Email or Password error"), 401


def createUser():
    try:
        fullName = request.json["fullName"]
        position = request.json["position"]
        email = request.json["email"]
        password="".join(random.choices(string.ascii_lowercase, k=10))
        #password = request.json["password"]
        phoneNumber = request.json["phoneNumber"]
        user = User(fullName=fullName, position=position, email=email, password=password, phoneNumber=phoneNumber, role=RoleEnum.USER)
        user.hashPassword()
        user.save()
        return jsonify(message="User created sucessfully"), 201
    except Exception:  
        return jsonify(message="User creation error"), 400

@admin_required()
def getUsers():
    users = User.objects.filter(role=RoleEnum.USER).only('fullName', 'position',"email","phoneNumber")
    return jsonify(users), 200

@admin_required()
def deleteUser(email):
    User.objects.filter(email=email).delete()
    return jsonify(message="User deleted sucessfully"), 200

@admin_required()
def getUser(email):
    user = User.objects.filter(email=email).first()
    if user:
        return jsonify(user), 200
    else:
        return jsonify(message="user not found"), 404

def updateUser(oldEmail):
    try:
        fullName = request.json["fullName"]
        position = request.json["position"]
        email = request.json["email"]
        password = request.json.get("password", None)
        phoneNumber = request.json["phoneNumber"]
        user = User.objects(email=oldEmail).first()
        user.fullName = fullName
        user.position = position
        user.email = email
        user.phoneNumber = phoneNumber
        if (password):
            user.password = password
            user.hashPassword()
        user.save()
        print(user)
        return  jsonify(user), 200
    except Exception:  
        return jsonify(message="User update error"), 400



def getcompetitors():
    competitors = competitor.objects()
    return jsonify(competitors), 200

""" def gett():#dateD,dateF,type,nom_concurent):
    
   # dd = datetime.strptime(dateD, '%Y-%m-%d').date()
   # df= datetime.strptime(dateF, '%Y-%m-%d').date()
    data=Talan.objects()#poste_date__lt=df ,  poste_date__gt=dd, type=type ,nom_concurent=nom_concurent)
   # if data:
    return jsonify(data)
   # else:
       # return jsonify(message="data not found"), 404 """
def concu(type,dateD,dateF,nom_concurent):

    start_date= datetime.strptime(dateD, '%Y-%m-%d').date()
    end_date = datetime.strptime(dateF, '%Y-%m-%d').date()
    data=Concurrent.objects(type=type,poste_date__gte=start_date,poste_date__lte=end_date,nom_concurent=nom_concurent)
    return jsonify(data)

""" def gett():

    type = request.json["type"] 
    start_date= datetime.strptime(request.json["start_date"], '%Y-%m-%d').date()
    end_date = datetime.strptime(request.json["end_date"], '%Y-%m-%d').date()
    data=Talan.objects(type=type,poste_date__gt=dd,poste_date__lt=df) #poste_date__lt=df ,poste_date__gt=dd, type=type) dateD,dateF,type
    return jsonify(data) """

     # df= datetime.strptime(dateF, '%Y-%m-%d').date()

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'innovationtalan356@gmail.com'
app.config['MAIL_PASSWORD'] = 'pfe2022hedighaith'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)





def sentMail(email):
   #email = request.json["email"]
   user = User.objects(email=email).first()
   if (not user):
       return jsonify(message="User with this email does not exists"), 400 

   msg = Message(sender="innovationtalan356@gmail.com", recipients = [user.email], subject=F"Welcome to Talan madame/monsieur {user.fullName}")

   msg.body = F"Paramètre d’accès de votre compte :  votre email= {user.email},  Votre password={user.password}"
   mail.send(msg) 
   
   return jsonify(message="Message sent successfully"), 200   
   
@jwt_required()
def aRegarder():
    postlink = request.json["post_link"]
    post=Concurrent.objects.filter(post_link=postlink).first()
    user = User.objects.filter(email=get_jwt_identity()["email"]).first()
    Posts = Aregarder(post=post, user=user)
    Posts.save()
    return  jsonify(post), 200 

@jwt_required()
def getlikedPosts():
    user = User.objects.filter(email=get_jwt_identity()["email"]).first()
    likedPosts= Aregarder.objects.filter(user=user)
    data = []
    for i in likedPosts:
        data.append(Concurrent.objects.filter(id=i.post.id).first())
    return jsonify(data), 200

def deletePostlike(id):
    Aregarder.objects.filter(post=id).delete()
    return jsonify(message="Post deleted sucessfully"), 200    













