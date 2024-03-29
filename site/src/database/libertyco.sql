DROP DATABASE libertyco;
CREATE DATABASE libertyco;
USE libertyco;
SET FOREIGN_KEY_CHECKS=0;

CREATE TABLE Instituicao (
	idInstituicao INT PRIMARY KEY AUTO_INCREMENT,
    razaoSoc VARCHAR(120),
    cnpj VARCHAR(14),
    email VARCHAR(100),
    cep VARCHAR(8),
    numero INT,
    complemento VARCHAR(10),
    token VARCHAR(6),
    senha VARCHAR(45)
);

CREATE TABLE Gestor (
	idGestor INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    ultimoNome VARCHAR (45),
    cargo VARCHAR(25),
    email VARCHAR(45),
    senha VARCHAR(45),
    fkInstituicao INT, FOREIGN KEY (fkInstituicao) REFERENCES Instituicao(idInstituicao)
);

CREATE TABLE Telefone (
	idTelefone INT PRIMARY KEY AUTO_INCREMENT,
    numTelefone CHAR(14),
    numCelular CHAR(15),
    senha VARCHAR(45),
    fkInstituicao INT, FOREIGN KEY (fkInstituicao) REFERENCES Instituicao(idInstituicao),
    fkGestor INT, FOREIGN KEY (fkGestor) REFERENCES Gestor(idGestor)
);

CREATE TABLE Maquina (
	idMaquina INT PRIMARY KEY AUTO_INCREMENT,
    hostName VARCHAR(45),
    nomeDono VARCHAR(45),
    sobrenomeDono VARCHAR(45),
    sistemaOperacional VARCHAR(45),
    status BOOLEAN,	
    fkGestor INT, FOREIGN KEY (fkGestor) REFERENCES Gestor(idGestor)
);

CREATE TABLE Processo (
	idProcesso INT PRIMARY KEY AUTO_INCREMENT,
    nomeProcesso VARCHAR(45),
    fkMaquina INT, FOREIGN KEY (fkMaquina) REFERENCES Maquina(idMaquina)
);

SELECT * FROM Instituicao;
SELECT * FROM Gestor;
SELECT * FROM Maquina;
SELECT * FROM Processo;
TRUNCATE TABLE Instituicao;

INSERT INTO Instituicao VALUES (null, 'Leo', 66666666666666, 'leor', 08210450, 20, 3213, 1234,1234);
INSERT INTO Gestor VALUES (null, 'Leo', 'Junior', 'sim', 'teste', 'teste', 1);
INSERT INTO Maquina VALUES (null, 'abc', 'abc', 'abc', 'abc', 0 , 1);
DELETE FROM Instituicao WHERE idInstituicao = 4;
DELETE FROM Maquina WHERE idMaquina = 4;


ALTER TABLE Maquina RENAME COLUMN SO TO sistemaOperacional;
SELECT * FROM Maquina WHERE fkGestor = 1 AND STATUS = 1;
SELECT idMaquina FROM Maquina WHERE fkGestor = 1 ORDER BY idMaquina DESC LIMIT 1;

-- AZURE

-- CREATE TABLE Instituicao (
-- 	idInstituicao INT PRIMARY KEY IDENTITY(1,1),
--     razaoSoc VARCHAR(120),
--     cnpj VARCHAR(14),
--     email VARCHAR(100),
--     cep VARCHAR(8),
--     numero INT,
--     complemento VARCHAR(10),
--     token VARCHAR(6),
--     senha VARCHAR(45)
-- );

-- CREATE TABLE Gestor (
-- 	idGestor INT PRIMARY KEY IDENTITY(1,1),
--     nome VARCHAR(45),
--     ultimoNome VARCHAR (45),
--     cargo VARCHAR(25),
--     email VARCHAR(45),
--     senha VARCHAR(45),
--     fkInstituicao INT FOREIGN KEY REFERENCES Instituicao(idInstituicao)
-- );

-- CREATE TABLE Telefone (
-- 	idTelefone INT PRIMARY KEY IDENTITY(1,1),
--     numTelefone CHAR(14),
--     numCelular CHAR(15),
--     senha VARCHAR(45),
--     fkInstituicao INT FOREIGN KEY REFERENCES Instituicao(idInstituicao),
--     fkGestor INT FOREIGN KEY REFERENCES Gestor(idGestor)
-- );

-- CREATE TABLE Maquina (
-- 	idMaquina INT PRIMARY KEY IDENTITY(1,1),
--     hostName VARCHAR(45),
--     nomeDono VARCHAR(45),
--     ultimoNomeDono VARCHAR(45),
--     sistemaOperacional VARCHAR(45),
--     status BOOLEAN,	
--     fkGestor INT FOREIGN KEY REFERENCES Gestor(idGestor)
-- );

-- CREATE TABLE Processo (
-- 	idProcesso INT PRIMARY KEY IDENTITY(1,1),
--     nomeProcesso VARCHAR(45),
--     fkMaquina INT FOREIGN KEY REFERENCES Maquina(idMaquina)
-- );