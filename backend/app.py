from flask import Flask , request ,jsonify ,Blueprint
from config import app, db
from flask_jwt_extended import verify_jwt_in_request, create_access_token, create_refresh_token, get_jwt_identity, get_jwt, jwt_required
import jwt
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError

from Models.weather import User

from Routes.user import user_route
from Routes.email_verification import verification_route


app.register_blueprint(user_route,url_prefix="/user")
app.register_blueprint(verification_route,url_prefix="/verification")

@app.route("/",methods=["GET"])
def func():
    return jsonify({"message":"Hello World"})