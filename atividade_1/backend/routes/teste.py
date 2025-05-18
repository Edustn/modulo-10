from email.message import EmailMessage
import smtplib
import os 
from dotenv import load_dotenv

load_dotenv()  

corpo_email = f"""
                    <p>Olá, seu código é: 5555</p>
                """

msg = EmailMessage()
msg['Subject'] = "Assunto"
msg['From'] = os.getenv('EMAIL')
msg['To'] = 'eduardo102740@gmail.com'
password = os.getenv('SENHA')
msg.set_content(corpo_email, subtype='html')

with smtplib.SMTP('smtp.gmail.com', 587) as s:
    s.starttls()
    s.login(msg['From'], password)
    s.send_message(msg)
    print('Email enviado')