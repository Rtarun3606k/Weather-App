from flask import Blueprint, jsonify, request
from Models.weather import User,DailySummary,RealTimeWeather
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
    if not user:
        return jsonify({'message': 'invalid email or password'}), 401
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
    user_city = get_data.get("city")
    user_password_retype = get_data.get("user_password_retype")
    temperature_alert = get_data.get("alert_threshold")

    if user_email:
        if not re.match(r"[^@]+@[^@]+\.[^@]+", user_email):
            return jsonify({'message': 'invalid email'}), 401
        check_user.user_email = user_email
        check_user.email_verified = False

    if user_name:
        if len(user_name) < 6:
            return jsonify({'message': 'username must be 6 characters or more'}), 401
        check_user.user_name = user_name

    if user_password:
        if user_password != user_password_retype:
            return jsonify({'message': 'passwords are not matching!'}), 401
        if len(user_password) < 6:
            return jsonify({'message': 'password must be 6 characters or more'}), 401
        hashed = bcrypt.hashpw(user_password.encode('utf-8'), bcrypt.gensalt())
        check_user.user_password = hashed

    if user_city:
        check_user.city = user_city

    if temperature_alert is not None:
        check_user.alert_threshold = temperature_alert

    db.session.commit()
    return jsonify({'message': 'updated successfully'}), 200
# so its still showing frontend in vs code i deleted and want  to add 2 folder frrontend and backend they are in one folder called weather app 1 i 


@user_route.route("/delete", methods=["DELETE"])
@jwt_required()
def delete():
    user_id = get_jwt_identity()
    user = User.query.filter_by(user_id=user_id).first()

    if not user:
        return jsonify({'message': 'user not found'}), 401

    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'deleted successfully'}), 200


@user_route.route("/get", methods=["GET"])
@jwt_required()
def get():
    user_id = get_jwt_identity()
    user = User.query.filter_by(user_id=user_id).first()

    if not user:
        return jsonify({'message': 'user not found'}), 401

    return jsonify({'user_name': user.user_name, 'user_email': user.user_email, 'user_city': user.city, 'alert_threshold': user.alert_threshold,"email_verified":user.email_verified ,"alerts":user.alerts}), 200


@user_route.route("/alerts", methods=["POST"])
@jwt_required()
def alerts():
    user_id = get_jwt_identity()
    user = User.query.filter_by(user_id=user_id).first()

    if not user:
        return jsonify({'message': 'user not found'}), 401

   
    print(user.alerts)
    
    if user.alerts:
        user.alerts = False
        db.session.commit()
        return jsonify({'message': 'alert threshold is set off'}), 200
    elif not user.alerts :
        user.alerts = True
        db.session.commit()
        return jsonify({'message': 'alert threshold is set on'}), 200
    else:
        return jsonify({'message': 'invalid alert threshold value'}), 400
    

@user_route.route("/realtime_weather", methods=["POST"])
def add_realtime_weather():
    get_data = request.json
    city_name = get_data.get("city_name")
    temperature = get_data.get("temperature")
    feels_like = get_data.get("feels_like")
    main_condition = get_data.get("main_condition")

    if not city_name or temperature is None or feels_like is None or not main_condition:
        return jsonify({'message': 'please fill all the fields'}), 401

    new_weather = RealTimeWeather(
        city_name=city_name,
        temperature=temperature,
        feels_like=feels_like,
        main_condition=main_condition
    )

    try:
        db.session.add(new_weather)
        db.session.commit()
        return jsonify({"message": 'realtime weather added successfully'}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 401


@user_route.route("/daily_summary", methods=["POST"])
def add_daily_summary():
    get_data = request.json
    city_name = get_data.get("city_name")
    date = get_data.get("date")
    avg_temperature = get_data.get("avg_temperature")
    max_temperature = get_data.get("max_temperature")
    min_temperature = get_data.get("min_temperature")
    dominant_condition = get_data.get("dominant_condition")

    if not city_name or not date or avg_temperature is None or max_temperature is None or min_temperature is None or not dominant_condition:
        return jsonify({'message': 'please fill all the fields'}), 401

    new_summary = DailySummary(
        city_name=city_name,
        date=date,
        avg_temperature=avg_temperature,
        max_temperature=max_temperature,
        min_temperature=min_temperature,
        dominant_condition=dominant_condition
    )

    try:
        db.session.add(new_summary)
        db.session.commit()
        return jsonify({"message": 'daily summary added successfully'}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 401


@user_route.route("/realtime_weather/<int:id>", methods=["GET"])
def get_realtime_weather(id):
    weather = RealTimeWeather.query.get(id)

    if not weather:
        return jsonify({'message': 'realtime weather not found'}), 404

    return jsonify({
        'city_name': weather.city_name,
        'temperature': weather.temperature,
        'feels_like': weather.feels_like,
        'main_condition': weather.main_condition,
        'timestamp': weather.timestamp,
        'alert_triggered': weather.alert_triggered
    }), 200


@user_route.route("/daily_summary/<int:id>", methods=["GET"])
def get_daily_summary(id):
    summary = DailySummary.query.get(id)

    if not summary:
        return jsonify({'message': 'daily summary not found'}), 404

    return jsonify({
        'city_name': summary.city_name,
        'date': summary.date,
        'avg_temperature': summary.avg_temperature,
        'max_temperature': summary.max_temperature,
        'min_temperature': summary.min_temperature,
        'dominant_condition': summary.dominant_condition
    }), 200
