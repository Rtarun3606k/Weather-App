from apscheduler.schedulers.background import BackgroundScheduler
from Models.weather import User
from email_verification.send_alerts import send_email
from flask import current_app as app
from config import app as flask_app
from corn_job.weather_data import get_weather_data
import logging


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def corn_job():
    print("App started with scheduler.")
    with flask_app.app_context():
        query_users = User.query.all()
        if not query_users:
            print('No users found')

        for user in query_users:
            if user.email_verified:
                if user.alerts:
                    print('User email verified')
                    # print(user.user_name)
                    # print(user.user_email)
                    # print(user.city)
                    # print(user.alert_threshold)
                    # print(user.preferred_temp_unit)
                    # print(user.email_verified)
                    data_recived = get_weather_data(user.city) 
                    convert_temp = round(data_recived['temp'] - 273.15, 3)
                    if convert_temp > user.alert_threshold:
                        print('Alert threshold reached')
                        send_email(user.user_name, user.user_email, user.city, convert_temp, data_recived['desc'])
                    print(data_recived['max_temp'])
            # send_email(user.user_name, user.user_email, user.city, convert_temp, data_recived['desc'])
            print('User email not verified')


def start_scheduler():
    scheduler = BackgroundScheduler()
    print("working")
    scheduler.add_job(corn_job, 'interval', hours=1)#change the frequency to run corn job eg minutes = 1 or seconds = 2
    scheduler.start()
    logger.info("Scheduler started")
 