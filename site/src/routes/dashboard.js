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

module.exports = router;