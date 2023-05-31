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

function listarMaquinasInativas(req, res) {
    idGestor = req.params.idGestor;
    maquinaModel.listarMaquinasInativas(idGestor)
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
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var idGestor = req.params.idGestor;
    var hostName = req.body.hostNameServer;
    var nomeDono = req.body.nomeDonoServer;
    var ultimoNomeDono = req.body.ultimoNomeDonoServer;
    var sistemaOperacional = req.body.sistemaOperacionalServer;
    var status = req.body.statusServer;

    // Faça as validações dos valores
    if (hostName == undefined) {
        res.status(400).send("o hostName está undefined!");
    } else if (nomeDono == undefined) {
        res.status(400).send("Seu nomeDono está undefined!");
    } else if (ultimoNomeDono == undefined) {
        res.status(400).send("Seu ultimoNomeDono está undefined!");
    } else if (sistemaOperacional == undefined) {
        res.status(400).send("Seu sistemaOperacional está undefined!");
    } else if (status == undefined) {
        res.status(400).send("Seu status está undefined!");
    } else if (idGestor == undefined) {
        res.status(400).send("Seu idGestor está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo maquinaModel.js
        maquinaModel.cadastrarMaquina(hostName, nomeDono, ultimoNomeDono, sistemaOperacional, status, idGestor)
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

function cadastrarProcessosSeremEncerrados(req, res) {
    var processo = req.body.processoServer;
    var idMaquina = req.params.idMaquina;

    // Faça as validações dos valores
    if (idMaquina == undefined) {
        res.status(400).send("Seu idMaquina está undefined!");
    } else if (processo == undefined) {
        res.status(400).send("Seu processo está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo maquinaModel.js
        maquinaModel.cadastrarProcessosSeremEncerrados(processo, idMaquina)
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

function getIdMaquinaCadastrada(req, res) {
    var idGestor = req.params.idGestor;

    maquinaModel.getIdMaquinaCadastrada(idGestor)
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
    var novoHostName = req.body.hostNameServer;
    var novoNomeDono = req.body.nomeDonoServer;
    var novoUltimoNomeDono = req.body.ultimoNomeDonoServer;
    var novoSO = req.body.sistemaOperacionalServer;
    var novoStatus = req.body.statusServer;
    var idMaquina = req.params.idMaquina;

    maquinaModel.editarMaquina(novoHostName, novoNomeDono, novoUltimoNomeDono, novoSO, novoStatus, idMaquina)
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

function getJanelasSeremEncerradas(req, res) {
    var idMaquina = req.params.idMaquina;

    maquinaModel.getJanelasSeremEncerradas(idMaquina)
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

function deletarJanela(req, res) {
    var idJanela = req.params.idJanela;

    maquinaModel.deletarJanela(idJanela)
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
    getIdMaquinaCadastrada,
    cadastrarMaquina,
    cadastrarProcessosSeremEncerrados,
    listarMaquinas,
    listarMaquinasInativas,
    getDadosMaquina,
    editarMaquina,
    deletarMaquina,
    getJanelasSeremEncerradas,
    deletarJanela
}