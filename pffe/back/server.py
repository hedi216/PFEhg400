from models import User
from flask import Flask, render_template, request, session
import json
from flask_mongoengine import MongoEngine
from routes import user_bp
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_mail import Mail,Message



def createApp():
    app = Flask(__name__, template_folder="templates", static_folder="assets")
    cors = CORS(app, resources={r"*": {"origins": "*"}})
    # app configs
    app.config['MONGODB_SETTINGS'] = {
        "db": "myapp",
    }
    mail = Mail(app)
    app.config['MAIL_SERVER']='smtp.gmail.com'
    app.config['MAIL_PORT'] = 465
    app.config['MAIL_USERNAME'] = 'innovationtalan356@gmail.com'
    app.config['MAIL_PASSWORD'] = 'pfe2022hedighaith'
    app.config['MAIL_USE_TLS'] = False
    app.config['MAIL_USE_SSL'] = True
    mail = Mail(app)






    app.config['SECRET_KEY'] = 'é""é"(ççà58dfgdg$jsng$%fs%dfsdfsdf'
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 60 * 60 * 24 * 7 # 7 days

    # json web token
    jwt = JWTManager(app)
    # Mongo db
    db = MongoEngine(app)

    # routes
    app.register_blueprint(user_bp)

    return app, db




app, db = createApp()
if __name__ == "__main__":
    app.run(debug=True, port=5000)