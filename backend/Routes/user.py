from flask import Blueprint, jsonify, request
from Models.weather import User
from config import db
import bcrypt
import re
from flask_jwt_extended import jwt_required, get_jwt_identity,create_access_token

user_route = Blueprint('user_route', __name__)

@user_route.route("/register", methods=["POST"])
def register():
    get_data = request.json
    user_email = get_data.get("user_email")
    user_name = get_data.get("user_name")
    user_password = get_data.get("user_password")
    user_password_retype = get_data.get("user_password_retype")
    # user_city = get_data.get("user_city")

    if not user_email or not user_password or not user_name:
        return jsonify({'message': 'please fill all the fields'}), 401
    if user_password != user_password_retype:
        return jsonify({'message': 'passwords are not matching!'}), 401
    if not re.match(r"[^@]+@[^@]+\.[^@]+", user_email):
        return jsonify({'message': 'invalid email'}), 401
    if len(user_password) < 6:
        return jsonify({'message': 'password must be 6 characters or more'}), 401
    if len(user_name) < 6:
        return jsonify({'message': 'username must be 6 characters or more'}), 401
    if User.query.filter_by(user_email=user_email).first():
        return jsonify({'message': 'email already exists'}), 401

    hashed = bcrypt.hashpw(user_password.encode('utf-8'), bcrypt.gensalt())
    new_user = User(user_name=user_name, user_email=user_email, user_password=hashed, email_verified=False)
    
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": 'registered successfully'}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 401

@user_route.route("/login", methods=["POST"])
def login():
    get_data = request.json
    user_email = get_data.get("user_email")
    user_password = get_data.get("user_password")

    if not user_email or not user_password:
        return jsonify({'message': 'please fill all the fields'}), 401

    user = User.query.filter_by(user_email=user_email).first()
    access_token = create_access_token(identity=user.user_id, expires_delta=False)
    if not user or not bcrypt.checkpw(user_password.encode('utf-8'), user.user_password):
        return jsonify({'message': 'invalid email or password'}), 401

    return jsonify({'message': 'logged in successfully',"access_token":access_token}), 200

@user_route.route("/update", methods=["PUT"])
@jwt_required()
def update():
    get_data = request.json
    user_id = get_jwt_identity()
    check_user = User.query.filter_by(user_id=user_id).first()

    if not check_user:
        return jsonify({'message': 'user not found'}), 401

    user_email = get_data.get("user_email")
    user_name = get_data.get("user_name")
    user_password = get_data.get("user_password")
    user_city = get_data.get("user_city")
    user_password_retype = get_data.get("user_password_retype")
    temperature_alert = get_data.get("temperature_alert")

    if not user_email:
        return jsonify({'message': 'user_email is required'}), 401

    user = User.query.filter_by(user_email=user_email).first()
    if not user:
        return jsonify({'message': 'user not found'}), 401

    if user_name:
        if len(user_name) < 6:
            return jsonify({'message': 'username must be 6 characters or more'}), 401
        user.user_name = user_name

    if user_password:
        if user_password != user_password_retype:
            return jsonify({'message': 'passwords are not matching!'}), 401
        if len(user_password) < 6:
            return jsonify({'message': 'password must be 6 characters or more'}), 401
        hashed = bcrypt.hashpw(user_password.encode('utf-8'), bcrypt.gensalt())
        user.user_password = hashed


    if user_city:
        user.user_city = user_city

    if temperature_alert is not None:
        user.temperature_alert = temperature_alert

    db.session.commit()
    return jsonify({'message': 'updated successfully'}), 200
# so its still showing frontend in vs code i deleted and want  to add 2 folder frrontend and backend they are in one folder called weather app 1 i 