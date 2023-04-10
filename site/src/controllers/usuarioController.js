var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listarGestores(req, res) {
    usuarioModel.listarGestores()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function entrar(req, res) {
    var cnpj = req.body.cnpjServer;
    var email = req.body.emailServer;
    var token = req.body.tokenServer;
    var senha = req.body.senhaServer;

    if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (token == undefined) {
        res.status(400).send("Seu token está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.entrar(cnpj, email, token, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var razaoSoc = req.body.razaoServer;
    var cnpj = req.body.cnpjServer;
    var email = req.body.emailServer;
    var cep = req.body.cepServer;
    var log = req.body.logServer;
    var bairro = req.body.bairroServer;
    var num = req.body.numServer;
    var comp = req.body.compServer;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores
    if (razaoSoc == undefined) {
        res.status(400).send("a razão social está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (cep == undefined) {
        res.status(400).send("Seu cep está undefined!");
    } else if (log == undefined) {
        res.status(400).send("Seu log está undefined!");
    } else if (bairro == undefined) {
        res.status(400).send("Seu bairro está undefined!");
    } else if (num == undefined) {
        res.status(400).send("Seu num está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(razaoSoc, cnpj, email, cep, log, bairro, num, comp, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarGestor(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nomeGestor = req.body.nomeServer;
    var ultimoNome = req.body.sobrenomeServer;
    var cargo = req.body.cargoServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores
    if (nomeGestor == undefined) {
        res.status(400).send("o nome do gestor está undefined!");
    } else if (ultimoNome == undefined) {
        res.status(400).send("Seu sobrenome está undefined!");
    } else if (cargo == undefined) {
        res.status(400).send("Seu cargo está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nomeGestor, ultimoNome, cargo, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    entrar,
    cadastrar,
    cadastrarGestor,
    listarGestores,
    testar
}