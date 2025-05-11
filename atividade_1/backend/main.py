from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn
import random
import time

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ou coloque o domínio do seu app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Simula banco de dados em memória
otp_storage = {}

app = FastAPI()

class EmailModel(BaseModel):
    email: str

class OTPModel(BaseModel):
    email: str
    otp: str

class ResetModel(BaseModel):
    email: str
    senha: str

@app.post("/send-otp")
def send_otp(data: EmailModel):
    otp = str(random.randint(100000, 999999))
    otp_storage[data.email] = {"otp": otp, "expires": time.time() + 300}
    print(f"Enviar este código para {data.email}: {otp}")
    return {"msg": "Código enviado"}

@app.post("/verify-otp")
def verify_otp(data: OTPModel):
    registro = otp_storage.get(data.email)
    if not registro or registro['otp'] != data.otp or time.time() > registro['expires']:
        raise HTTPException(status_code=400, detail="Código inválido ou expirado")
    return {"msg": "OTP válido"}

@app.post("/reset-password")
def reset_password(data: ResetModel):
    print(f"Senha do {data.email} alterada para: {data.senha}")
    return {"msg": "Senha redefinida com sucesso"}


if __name__ == "__main__":  
    uvicorn.run(app, host="0.0.0.0", port=8000)