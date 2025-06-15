# cria_banco.py
import sqlite3

# Caminhos dos arquivos
SQL_FILE = 'init_db.sql'
DB_FILE = 'data_base.db'

# Conecta ao banco (cria se não existir)
conn = sqlite3.connect(DB_FILE)
cursor = conn.cursor()

# Lê o SQL do arquivo
with open(SQL_FILE, 'r', encoding='utf-8') as f:
    sql_script = f.read()

# Executa o script SQL
cursor.executescript(sql_script)

# Salva e fecha
conn.commit()
conn.close()

print(f'Banco de dados "{DB_FILE}" criado e populado com sucesso!') 