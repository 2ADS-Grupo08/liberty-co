var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

router.get("/listarMaquinas/:idGestor", function (req, res) {
    maquinaController.listarMaquinas(req, res);
});

router.post("/cadastrarMaquina/:idGestor", function (req, res) {
    maquinaController.cadastrarMaquina(req, res);
})

router.post("/cadastrarProcessosSeremEncerrados/:idGestor/:idMaquina", function (req, res) {
    maquinaController.cadastrarProcessosSeremEncerrados(req, res);
});

router.get("/getIdMaquinaCadastrada/:idGestor", function (req, res) {
    maquinaController.getIdMaquinaCadastrada(req, res);
});

router.get("/getDadosMaquina/:idMaquina", function (req, res) {
    maquinaController.getDadosMaquina(req, res);
});

router.put("/editarMaquina/:idMaquina", function (req, res) {
    maquinaController.editarMaquina(req, res);
});

router.delete("/deletarMaquina/:idMaquina", function (req, res) {
    maquinaController.deletarMaquina(req, res);
});

module.exports = router;