var dashboardModel = require("../models/dashboardModel");

function medidaIdealComponentes(req, res) {

    var idMaquina = req.params.idMaquina;

    dashboardModel.medidaIdealComponentes(idMaquina).then(function (resultado) {
        if (resultado.length > 0) {
            console.log(resultado)
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

function mediaUsoRamSemanaVisaoGeral(req, res) {
    var idMaquina = req.params.idMaquina;

    dashboardModel.mediaUsoRamSemanaVisaoGeral(idMaquina).then(function (resultado) {
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

function mediaUsoCpuSemanaVisaoGeral(req, res) {
    var idMaquina = req.params.idMaquina;

    dashboardModel.mediaUsoCpuSemanaVisaoGeral(idMaquina).then(function (resultado) {
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

function informacoesDonoMaquina(req, res) {
    var idMaquina = req.params.idMaquina;

    dashboardModel.informacoesDonoMaquina(idMaquina).then(function (resultado) {
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

function informacoesLegendaCpu(req, res) {
    var idMaquina = req.params.idMaquina;

    dashboardModel.informacoesLegendaCpu(idMaquina).then(function (resultado) {
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

function cpuEmTempoReal(req, res) {
    var idMaquina = req.params.idMaquina;

    dashboardModel.cpuEmTempoReal(idMaquina).then(function (resultado) {
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

function informacoesLegendaRam(req, res) {
    var idMaquina = req.params.idMaquina;

    dashboardModel.informacoesLegendaRam(idMaquina).then(function (resultado) {
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

function ramEmTempoReal(req, res) {
    var idMaquina = req.params.idMaquina;

    dashboardModel.ramEmTempoReal(idMaquina).then(function (resultado) {
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

function informacoesLegendaDisco(req, res) {
    var idMaquina = req.params.idMaquina;

    dashboardModel.informacoesLegendaDisco(idMaquina).then(function (resultado) {
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

function mediaUsoDiscoSemana(req, res) {
    var idMaquina = req.params.idMaquina;

    dashboardModel.mediaUsoDiscoSemana(idMaquina).then(function (resultado) {
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
    diasCpuLimiteVisaoGeral,
    mediaUsoRamSemanaVisaoGeral,
    mediaUsoCpuSemanaVisaoGeral,
    informacoesDonoMaquina,
    informacoesLegendaCpu,
    cpuEmTempoReal,
    informacoesLegendaRam,
    ramEmTempoReal,
    informacoesLegendaDisco,
    mediaUsoDiscoSemana
}