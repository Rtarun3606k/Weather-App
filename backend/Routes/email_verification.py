
from flask import Blueprint,jsonify,request,send_file,render_template
from Models.weather import RealTimeWeather, DailySummary,User
from config import db
import bcrypt
import re
from flask_jwt_extended import jwt_required, get_jwt_identity

from Models.weather import User
from email_verification.send_email import send_email



verification_route = Blueprint('verification_route', __name__)



@verification_route.route("/send_verification_email",methods=["POST"])
@jwt_required()
def send_verification_email():
    user_id = get_jwt_identity()
    user = User.query.filter_by(user_id=user_id).first()
    if not user:
        return jsonify({'message':'user not found'}),401
    if user.user_email_verified:
        return jsonify({'message':'email already verified'}),401
    flag  = send_email(user.user_name,user.user_email,user.user_id, True)
    if flag is None:
        return jsonify({'message':'error in sending email'}),401
    
    return jsonify({'message':f'verification email sent successfully {flag}'}),200

@verification_route.route("/verify_email/<int:id>/verify_email",methods=["GET"])
def verify_email(id):
    user_id = id
    user = User.query.filter_by(user_id=user_id).first()
    if not user:
        return render_template('email_verification_failed.html')
    if user.user_email_verified:
        return render_template('email_already_verified.html')
    user.user_email_verified = True
    db.session.commit()
    return render_template('email_verification_success.html')
