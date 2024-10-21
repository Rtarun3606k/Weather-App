from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class RealTimeWeather(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    city_name = db.Column(db.String(50), nullable=False)
    temperature = db.Column(db.Float, nullable=False)
    feels_like = db.Column(db.Float, nullable=False)
    main_condition = db.Column(db.String(50), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    alert_triggered = db.Column(db.Boolean, default=False)

class DailySummary(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    city_name = db.Column(db.String(50), nullable=False)
    date = db.Column(db.Date, nullable=False)
    avg_temperature = db.Column(db.Float, nullable=False)
    max_temperature = db.Column(db.Float, nullable=False)
    min_temperature = db.Column(db.Float, nullable=False)
    dominant_condition = db.Column(db.String(50), nullable=False)




class User(db.Model):
    __tablename__ = 'users'
    
    user_id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(100), nullable=False)
    user_email = db.Column(db.String(120), unique=True, nullable=False)
    user_password = db.Column(db.String(128), nullable=False)
    
    # User preferences
    preferred_temp_unit = db.Column(db.String(1), nullable=False, default='C')  # 'C' for Celsius, 'F' for Fahrenheit
    city = db.Column(db.String(500), nullable=False)  # Store city names as a comma-separated string
    alert_threshold = db.Column(db.Float, nullable=True)  # Temperature threshold for alerts
    
    # Timestamps for tracking user creation and updates
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    # email verified checker
    email_verified = db.Column(db.Boolean, default=False)  

    



