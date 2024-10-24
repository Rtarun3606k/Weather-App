from app import app
from config import db
from corn_job.job import start_scheduler
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # Ensure DB tables are created
        start_scheduler()  # Start the scheduler
        logger.info("App started with scheduler.")
        print("App started with scheduler.")
    app.run(debug=True, port=5000,host='0.0.0.0')



# sudo docker-compose down
# sudo docker system prune -f
# sudo docker volume prune -f
# sudo docker-compose up --build


# sudo systemctl disable docker --now  
