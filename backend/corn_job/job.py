from apscheduler.schedulers.background import BackgroundScheduler
# from Models.weather import User
class User:
    def __init__(self, name, email, city, alert_threshold, preferred_temp_unit, email_verified):
        self.name = name
        self.email = email
        self.city = city
        self.alert_threshold = alert_threshold
        self.preferred_temp_unit = preferred_temp_unit
        self.email_verified = email_verified

    @staticmethod
    def query():
        return UserQuery()

class UserQuery:
    def all(self):
        return [
            User("Alice", "alice@example.com", "New York", 75, "Fahrenheit", True),
            User("Bob", "bob@example.com", "Los Angeles", 80, "Celsius", False),
            User("Charlie", "charlie@example.com", "Chicago", 70, "Fahrenheit", True)
        ]

def corn_job():
    query_users = User.query().all()
    if not query_users:
        print('No users found')

    for user in query_users:
        if user.email_verified:
            print('User email verified')
            print(user.name)
            print(user.email)
            print(user.city)
            print(user.alert_threshold)
            print(user.preferred_temp_unit)
            print(user.email_verified)
        print('User email not verified')


def start_scheduler():
    scheduler = BackgroundScheduler()
    scheduler.add_job(corn_job, 'interval', seconds=11111)
    scheduler.start()
    print('Scheduler started')
    return scheduler