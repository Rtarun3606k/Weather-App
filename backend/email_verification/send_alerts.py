import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from dotenv import load_dotenv
load_dotenv()
import os

def read_html_template(template_path):
    try:
        with open(template_path, 'r') as file:
            html_content = file.read()
        return html_content
    except FileNotFoundError:
        print(f"Template file {template_path} not found.")
        return None


def send_email(participant_name, to_email, city,temp,desc):
    # Path to the HTML template
    verification_template_path = "templates/weather_alert.html"  # Email verification template

    smtp_server = f'{os.getenv("SMTP_SERVER")}'  # Gmail SMTP server
    smtp_port = os.getenv('EMAIL_PORT')  # Port for SSL
    smtp_user = f'{os.getenv("GMAIL_ID")}'  # Your Gmail address
    smtp_password = f'{os.getenv("GMAIL_PASSWORD")}'  # Your app-specific Gmail password

    # For email verification
    template_path = verification_template_path
    
    subject = f"{participant_name} weather alert!"

    # Read the selected HTML template
    html_template = read_html_template(template_path)
    if html_template is None:
        return None

    # Replace placeholders in the HTML template with dynamic data
    body = html_template.replace("{user_name}", participant_name).replace("{ city }",city ).replace("{temp}",temp).replace("{desc}",desc)

    try:
        # Create a multipart message
        msg = MIMEMultipart('alternative')
        msg['From'] = smtp_user
        msg['To'] = to_email
        msg['Subject'] = subject

        # Attach the HTML body with the msg instance
        msg.attach(MIMEText(body, 'html'))

        # Create a secure SSL context and send the email
        with smtplib.SMTP_SSL(smtp_server, smtp_port) as server:
            server.login(smtp_user, smtp_password)
            server.sendmail(smtp_user, to_email, msg.as_string())
            print(f"Email sent to {to_email} with subject '{subject}'")
            return f"Email sent to {to_email} with subject '{subject}'"

    except Exception as e:
        return f"Failed to send email to {to_email}. Error: {str(e)}"

# Example usage
# send_email("Yaashvin", "yaashvinsv@gmail.com", 12345, True)  # Email verification
# send_email("Yaashvin", "yaashvinsv@gmail.com", 12345, False)  # Password reset


# Example usage with dynamic user_id
# send_email("Yaashvin", "yaashvinsv@gmail.com", 12345, False)
# send_email("Yaashvin", "r.tarunnayaka25042005@gmail.com", 12345, False)
# send_email("Yaashvin", "r.tarunnayaka25042005@gmail.com", 12345, True)
# print("Email sent.")