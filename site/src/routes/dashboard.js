var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/medidaIdealComponentes/:idMaquina", function (req,res){
    dashboardController.medidaIdealComponentes(req, res)
});

router.get("/espacoDisponivelComponentesVisaoGeral/:idMaquina", function (req,res){
    dashboardController.espacoDisponivelComponentesVisaoGeral(req, res)
});

router.get("/espacoDisponivelComponentesVisaoGeral/:idMaquina", function (req,res){
    dashboardController.espacoDisponivelComponentesVisaoGeral(req, res)
});

module.exports = router;