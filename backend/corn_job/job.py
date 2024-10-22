from apscheduler.schedulers.background import BackgroundScheduler
from Models.weather import User
from email_verification.send_alerts import send_email
from flask import current_app as app
from app import app as flask_app


def corn_job():
    with flask_app.app_context():
        query_users = User.query.all()
        if not query_users:
            print('No users found')

        for user in query_users:
            if user.email_verified:
                print('User email verified')
                print(user.user_name)
                print(user.user_email)
                print(user.city)
                print(user.alert_threshold)
                print(user.preferred_temp_unit)
                print(user.email_verified)
                send_email(user.user_name, user.user_email, user.city, user.alert_threshold, user.preferred_temp_unit)
            print('User email not verified')


def start_scheduler():
    scheduler = BackgroundScheduler()
    scheduler.add_job(corn_job, 'interval', seconds=2)
    scheduler.start()
 