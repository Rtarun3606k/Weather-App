import multiprocessing
from dotenv import load_dotenv
from config import app, db
from corn_job.job import start_scheduler

# Load environment variables from .env file
load_dotenv()

# Gunicorn configuration variables
bind = "0.0.0.0:8000"
workers = multiprocessing.cpu_count() * 2 + 1
threads = 2 * multiprocessing.cpu_count()
timeout = 120

def on_starting(server):
    with app.app_context():
        db.create_all()
        start_scheduler()



#  gunicorn -c gunicorn_config.py wsgi:app