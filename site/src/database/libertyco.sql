DROP DATABASE libertyco;
CREATE DATABASE libertyco;
USE libertyco;

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
    nomeArq VARCHAR(45),
    ultimoNomeArq VARCHAR(45),
    SO VARCHAR(45),
    status BOOLEAN,	
    fkGestor INT, FOREIGN KEY (fkGestor) REFERENCES Gestor(idGestor)
);

SELECT * FROM Instituicao;
SELECT * FROM Maquina;
SELECT * FROM Gestor;
TRUNCATE TABLE Instituicao;

INSERT INTO Instituicao VALUES (null, 'Leo', 66666666666666, 'leor', 08210450, 20, 3213, 1234,1234);
INSERT INTO Gestor VALUES (null, 'Leo', 'Junior', 'sim', '12345', '1234', 1);
INSERT INTO Maquina VALUES (null, 'abc', 'abc', 'abc', 'abc', 0 , 1);
DELETE FROM Instituicao WHERE idInstituicao = 3;


-- AZURE

CREATE TABLE Instituicao (
	idInstituicao INT PRIMARY KEY IDENTITY(1,1),
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
	idGestor INT PRIMARY KEY IDENTITY(1,1),
    nome VARCHAR(45),
    ultimoNome VARCHAR (45),
    cargo VARCHAR(25),
    email VARCHAR(45),
    senha VARCHAR(45),
    fkInstituicao INT FOREIGN KEY REFERENCES Instituicao(idInstituicao)
);

CREATE TABLE Telefone (
	idTelefone INT PRIMARY KEY IDENTITY(1,1),
    numTelefone CHAR(14),
    numCelular CHAR(15),
    senha VARCHAR(45),
    fkInstituicao INT FOREIGN KEY REFERENCES Instituicao(idInstituicao),
    fkGestor INT FOREIGN KEY REFERENCES Gestor(idGestor)
);

CREATE TABLE Maquina (
	idMaquina INT PRIMARY KEY IDENTITY(1,1),
    hostName VARCHAR(45),
    nomeArq VARCHAR(45),
    ultimoNomeArq VARCHAR(45),
    SO VARCHAR(45),
    status BOOLEAN,	
    fkGestor INT FOREIGN KEY REFERENCES Gestor(idGestor)
);