var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/medidaIdealComponentes/:idMaquina", function (req,res){
    dashboardController.medidaIdealComponentes(req, res)
});

router.get("/espacoDisponivelComponentesVisaoGeral/:idMaquina", function (req,res){
    dashboardController.espacoDisponivelComponentesVisaoGeral(req, res)
});

router.get("/ramUltimos3DiasVisaoGeral/:idMaquina", function (req,res){
    dashboardController.ramUltimos3DiasVisaoGeral(req, res)
});

router.get("/diasCpuLimiteVisaoGeral/:idMaquina", function (req,res){
    dashboardController.diasCpuLimiteVisaoGeral(req, res)
});

router.get("/mediaUsoRamSemanaVisaoGeral/:idMaquina", function (req,res){
    dashboardController.mediaUsoRamSemanaVisaoGeral(req, res)
});

router.get("/mediaUsoCpuSemanaVisaoGeral/:idMaquina", function (req,res){
    dashboardController.mediaUsoCpuSemanaVisaoGeral(req, res)
});

router.get("/informacoesDonoMaquina/:idMaquina", function (req,res){
    dashboardController.informacoesDonoMaquina(req, res)
});

router.get("/informacoesLegendaCpu/:idMaquina", function (req,res){
    dashboardController.informacoesLegendaCpu(req, res)
});

router.get("/cpuEmTempoReal/:idMaquina", function (req,res){
    dashboardController.cpuEmTempoReal(req, res)
});

router.get("/informacoesLegendaRam/:idMaquina", function (req,res){
    dashboardController.informacoesLegendaRam(req, res)
});

router.get("/ramEmTempoReal/:idMaquina", function (req,res){
    dashboardController.ramEmTempoReal(req, res)
});

router.get("/informacoesLegendaDisco/:idMaquina", function (req,res){
    dashboardController.informacoesLegendaDisco(req, res)
});

router.get("/mediaUsoDiscoSemana/:idMaquina", function (req,res){
    dashboardController.mediaUsoDiscoSemana(req, res)
});

module.exports = router;