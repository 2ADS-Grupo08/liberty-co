var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

router.get("/listarMaquinas/:idGestor", function (req, res) {
    maquinaController.listarMaquinas(req, res);
});

router.get("/listarMaquinasInativas/:idGestor", function (req, res) {
    maquinaController.listarMaquinasInativas(req, res);
});

router.post("/cadastrarMaquina/:idGestor", function (req, res) {
    maquinaController.cadastrarMaquina(req, res);
})

router.post("/cadastrarProcessosSeremEncerrados/:idMaquina", function (req, res) {
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

router.get("/getJanelasSeremEncerradas/:idMaquina", function (req, res) {
    maquinaController.getJanelasSeremEncerradas(req, res);
});

router.get("/listarAlertas/", function (req, res) {
    maquinaController.listarAlertas(req, res);
});

router.delete("/deletarJanela/:idJanela", function (req, res) {
    maquinaController.deletarJanela(req, res);
});

module.exports = router;