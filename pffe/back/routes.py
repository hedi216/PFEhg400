from flask import Blueprint
from controllers import createUser, getUsers,login, deleteUser, getUser, updateUser,getcompetitors,concu, sentMail,aRegarder,getlikedPosts,deletePostlike
from flask_jwt_extended import jwt_required
user_bp = Blueprint("home_bp", __name__)


user_bp.route("/create", methods=["POST"])(createUser)
user_bp.route("/users", methods=["GET"])(getUsers)
user_bp.route("/login", methods=["POST"])(login)
user_bp.route("/delete/<email>", methods=["DELETE"])(deleteUser)
user_bp.route("/users/<email>", methods=["GET"])(getUser)
user_bp.route("/update/<oldEmail>", methods=["PUT"])(updateUser)
user_bp.route("/competit", methods=["GET"])(getcompetitors)
user_bp.route("/comp/<type>/<dateD>/<dateF>/<nom_concurent>", methods=["GET"])(concu)
user_bp.route("/send-password-mail/<email>", methods=["POST"])(sentMail)
user_bp.route("/regarder",methods=["POST"])(aRegarder)
user_bp.route("/likeposts",methods=["GET"])(getlikedPosts)
user_bp.route("/deletePostlike/<id>", methods=["DELETE"])(deletePostlike)






