var dashboardModel = require("../models/dashboardModel");

function medidaIdealComponentes(req, res) {

    var idMaquina = req.params.idMaquina;

    dashboardModel.medidaIdealComponentes(idMaquina).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function espacoDisponivelComponentesVisaoGeral(req, res) {

    var idMaquina = req.params.idMaquina;

    dashboardModel.espacoDisponivelComponentesVisaoGeral(idMaquina).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function ramUltimos3DiasVisaoGeral(req, res) {
    var idMaquina = req.params.idMaquina;

    dashboardModel.ramUltimos3DiasVisaoGeral(idMaquina).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function diasCpuLimiteVisaoGeral(req, res) {
    var idMaquina = req.params.idMaquina;

    dashboardModel.diasCpuLimiteVisaoGeral(idMaquina).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    medidaIdealComponentes,
    espacoDisponivelComponentesVisaoGeral,
    ramUltimos3DiasVisaoGeral,
    diasCpuLimiteVisaoGeral
}