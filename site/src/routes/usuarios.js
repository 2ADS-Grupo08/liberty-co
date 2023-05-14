var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listarGestores/:idEmpresa", function (req, res) {
    usuarioController.listarGestores(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrarEmpresa", function (req, res) {
    usuarioController.cadastrarEmpresa(req, res);
})

router.post("/cadastrarGestor/:idEmpresa", function (req, res) {
    usuarioController.cadastrarGestor(req, res);
})

router.get("/getDadosGestor/:idGestor", function (req, res) {
    usuarioController.getDadosGestor(req, res);
});

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

router.post("/autenticarGestor", function (req, res) {
    usuarioController.entrarGestor(req, res);
});

router.put("/editarGestor/:idGestor", function (req, res) {
    usuarioController.editarGestor(req, res);
});

module.exports = router;