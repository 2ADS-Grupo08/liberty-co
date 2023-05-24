var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/medidaIdealComponentes/:idMaquina", function (req,res){
    dashboardController.medidaIdealComponentes(req, res)
});

module.exports = router;