var maquinaModel = require("../models/maquinaModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA maquinaController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listarMaquinas(req, res) {
    idGestor = req.params.idGestor;
    maquinaModel.listarMaquinas(idGestor)
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

function cadastrarMaquina(req, res) {
    var idGestor = req.params.idGestor;
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var hostName = req.body.hostNameServer;
    var nomeArq = req.body.nomeArqServer;
    var ultimoNomeArq = req.body.ultimoNomeArqServer;
    var SO = req.body.soServer;

    // Faça as validações dos valores
    if (hostName == undefined) {
        res.status(400).send("o hostName está undefined!");
    } else if (nomeArq == undefined) {
        res.status(400).send("Seu nomeArq está undefined!");
    } else if (ultimoNomeArq == undefined) {
        res.status(400).send("Seu ultimoNomeArq está undefined!");
    } else if (SO == undefined) {
        res.status(400).send("Seu SO está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo maquinaModel.js
        maquinaModel.cadastrarMaquina(hostName, nomeArq, ultimoNomeArq, SO, idGestor)
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

function getDadosMaquina(req, res) {
    var idMaquina = req.params.idMaquina;

    maquinaModel.getDadosMaquina(idMaquina)
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

function editarMaquina(req, res) {
    var novoHostName = req.body.hostNameServer
    var novoNomeArq = req.body.nomeArqServer
    var novoUltimoNomeArq = req.body.ultimoNomeArqServer
    var novoSO = req.body.soServer
    var novoStatus = req.body.statusServer;
    var idMaquina = req.params.idMaquina;

    maquinaModel.editarMaquina(novoHostName, novoNomeArq, novoUltimoNomeArq, novoSO, novoStatus, idMaquina)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}

function deletarMaquina(req, res) {
    var idMaquina = req.params.idMaquina;

    maquinaModel.deletarMaquina(idMaquina)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}
module.exports = {
    cadastrarMaquina,
    listarMaquinas,
    getDadosMaquina,
    editarMaquina,
    deletarMaquina
}