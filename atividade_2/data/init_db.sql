-- Criação da tabela de usuários
CREATE TABLE IF NOT EXISTS gamer (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL UNIQUE,
    pontuacao INTEGER DEFAULT 0
);

-- Inserção de notas de exemplo
INSERT INTO gamer (nome, pontuacao) VALUES
('Morilo', 50),
('Dafine', 51),
('Carlota', 30),
('Serafim', 20);

INSERT INTO gamer (nome) VALUES  -- Usando DEFAULT 0 para pontuacao
('Trindade');