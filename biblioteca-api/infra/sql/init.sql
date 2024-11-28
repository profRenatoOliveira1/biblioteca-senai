-- Extensão necessária para utilizar funções criptográficas
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Drop de elementos existentes para evitar conflitos
DROP TRIGGER IF EXISTS trg_gerar_ra ON aluno;
DROP TRIGGER IF EXISTS trg_gerar_senha ON aluno;
DROP TRIGGER IF EXISTS trg_gerar_nome_arquivo ON aluno;
DROP FUNCTION IF EXISTS gerar_ra();
DROP FUNCTION IF EXISTS gerar_senha();
DROP FUNCTION IF EXISTS gerar_nome_arquivo();
DROP TABLE IF EXISTS emprestimo;
DROP TABLE IF EXISTS livro;
DROP TABLE IF EXISTS aluno;
DROP SEQUENCE IF EXISTS seq_ra;

-- Criando sequência para gerar RAs
CREATE SEQUENCE seq_ra START 1;

-- Criando tabela Aluno
CREATE TABLE aluno (
    id_aluno SERIAL PRIMARY KEY,
    ra VARCHAR(7) UNIQUE NOT NULL,
    nome VARCHAR(80) NOT NULL,
    sobrenome VARCHAR(80) NOT NULL,
    data_nascimento DATE,
    endereco VARCHAR(200),
    email VARCHAR(80),
    celular VARCHAR(20) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    nome_arquivo VARCHAR(255) DEFAULT 'uploads/users/default-profile.png',
    criado_em TIMESTAMP DEFAULT NOW()
);

-- Função para gerar RA automaticamente
CREATE OR REPLACE FUNCTION gerar_ra() RETURNS TRIGGER AS $$
BEGIN
    NEW.ra := 'AAA' || TO_CHAR(nextval('seq_ra'), 'FM0000');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para gerar RA automaticamente
CREATE TRIGGER trg_gerar_ra
BEFORE INSERT ON aluno
FOR EACH ROW EXECUTE FUNCTION gerar_ra();

-- Função para gerar senha automaticamente
CREATE OR REPLACE FUNCTION gerar_senha() RETURNS TRIGGER AS $$
BEGIN
    NEW.senha := encode(digest(NEW.ra, 'sha256'), 'hex');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para gerar senha automaticamente
CREATE TRIGGER trg_gerar_senha
BEFORE INSERT ON aluno
FOR EACH ROW EXECUTE FUNCTION gerar_senha();

-- Função para configurar o nome do arquivo automaticamente no formato <RA>-profile.png
CREATE OR REPLACE FUNCTION gerar_nome_arquivo() RETURNS TRIGGER AS $$
BEGIN
    -- Verificar se nome_arquivo está vazio ou nulo, caso contrário, usa o valor padrão
    IF NEW.nome_arquivo IS NULL OR NEW.nome_arquivo = '' THEN
        NEW.nome_arquivo := 'uploads/users/default-profile.png';  -- Valor padrão
    END IF;
    -- Gerar o nome de arquivo baseado no RA se o nome_arquivo for o padrão
    IF NEW.ra IS NOT NULL AND NEW.nome_arquivo = 'uploads/users/default-profile.png' THEN
        NEW.nome_arquivo := 'uploads/users/' || NEW.ra || '-profile.png';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para configurar nome_arquivo automaticamente
CREATE TRIGGER trg_gerar_nome_arquivo
BEFORE INSERT OR UPDATE ON aluno
FOR EACH ROW EXECUTE FUNCTION gerar_nome_arquivo();

-- Criando tabela Livro
CREATE TABLE livro (
    id_livro SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    autor VARCHAR(150) NOT NULL,
    editora VARCHAR(100) NOT NULL,
    ano_publicacao VARCHAR(4),
    isbn VARCHAR(20),
    quant_total INTEGER NOT NULL,
    quant_disponivel INTEGER NOT NULL,
    valor_aquisicao DECIMAL(10,2),
    imagem_capa VARCHAR(255) DEFAULT 'uploads/livros/book-default.png',
    status_livro_emprestado VARCHAR(20)
);

-- Criando tabela Emprestimo
CREATE TABLE emprestimo (
    id_emprestimo SERIAL PRIMARY KEY,
    id_aluno INT REFERENCES aluno(id_aluno),
    id_livro INT REFERENCES livro(id_livro),
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE,
    status_emprestimo VARCHAR(20)
);

-- Inserindo dados na tabela Aluno
INSERT INTO aluno (nome, sobrenome, data_nascimento, endereco, email, celular) 
VALUES 
('Conor', 'McGregor', '2005-01-15', 'Rua UFC, 123', 'mcgregor@ufc.com', '16998959876'),
('Amanda', 'Nunes', '2004-03-22', 'Rua UFC, 456', 'amanda.nunes@ufc.com', '16995992305');

-- Atualizando o nome_arquivo para incluir imagens baseadas nos RAs gerados no formato <RA>-profile.png
-- UPDATE aluno SET nome_arquivo = ra || '-profile.png';

-- Inserindo dados na tabela Livro
INSERT INTO livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado)
VALUES 
('O Senhor dos Anéis', 'J.R.R. Tolkien', 'HarperCollins', '1954', '978-0007525546', 10, 10, 150.00, 'Disponível'),
('1984', 'George Orwell', 'Companhia das Letras', '1949', '978-8535906770', 8, 8, 90.00, 'Disponível');

-- Inserindo dados na tabela Emprestimo
INSERT INTO emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo) 
VALUES 
(1, 1, '2024-09-01', '2024-09-15', 'Concluído'),
(2, 2, '2024-09-02', '2024-09-16', 'Em andamento');
