var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/medidaIdealComponentes/:idMaquina", function (req,res){
    medidaController.medidaIdealComponentes(req, res)
});

module.exports = router;