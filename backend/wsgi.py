from app import app
from config import db
from corn_job.job import start_scheduler

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        start_scheduler()
    app.run(debug=True,port=5000)
        