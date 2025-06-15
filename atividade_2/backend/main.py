from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import sqlite3
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()


# CORS para conexão com o app em Expo
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


DATABASE = "../data/data_base.db"

class Jogador(BaseModel):
    nome: str

def conectar_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

@app.post("/jogador")
def criar_ou_buscar_jogador(jogador: Jogador):
    conn = conectar_db()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM gamer WHERE nome = ?", (jogador.nome,))
    usuario = cursor.fetchone()

    if usuario:
        conn.close()
        return {
            "id": usuario["id"],
            "nome": usuario["nome"],
            "pontuacao": usuario["pontuacao"]
        }

    cursor.execute(
        "INSERT INTO gamer (nome, pontuacao) VALUES (?, ?)",
        (jogador.nome, 0)
    )
    conn.commit()

    jogador_id = cursor.lastrowid
    conn.close()

    return {"id": jogador_id, "nome": jogador.nome, "pontuacao": 0}


@app.get('/ranking')
def get_ranking():
    conn = conectar_db()
    cursor = conn.cursor()
    cursor.execute("SELECT nome, pontuacao FROM gamer")
    jogadores = cursor.fetchall()
    conn.close()

    ranking = []
    for jogador in jogadores:
        nome, pontuacao = jogador
        try:
            pontos = int(pontuacao) if pontuacao is not None and pontuacao != '' else 0
        except ValueError:
            pontos = 0
        ranking.append({"nome": nome, "pontuacao": pontos})

    ranking = sorted(ranking, key=lambda x: x["pontuacao"], reverse=True)

    return ranking

class Pontuacao(BaseModel):
    nome: str
    pontuacao: int

    
@app.put("/atualizar_pontuacao")
def atualizar_pontuacao(dados: Pontuacao):
    conn = conectar_db()
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE gamer SET pontuacao = ? WHERE nome = ?",
        (str(dados.pontuacao), dados.nome)
    )
    conn.commit()
    conn.close()

    return {"mensagem": "Pontuação atualizada com sucesso!"}



if __name__ == "__main__":  
    uvicorn.run(app, host="0.0.0.0", port=8000)