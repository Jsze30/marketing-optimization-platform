import smtplib
from email.mime.text import MIMEText

def send_email_alerts():
    try:
        with open("../data/performance_alerts.txt", "r") as f:
            alerts = f.read().strip()

        if not alerts:
            return {"status": "No alerts to send"}

        msg = MIMEText(alerts)
        msg["Subject"] = "🚨 Ad Performance Alerts"
        msg["From"] = "your_email@example.com"
        msg["To"] = "recipient_email@example.com"

        # Connect to Gmail (use an app password for security)
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login("your_email@example.com", "your_app_password")
            server.send_message(msg)

        return {"status": "✅ Email alert sent"}

    except Exception as e:
        return {"status": "❌ Failed to send email", "error": str(e)}
