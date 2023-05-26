var database = require("../database/config");

function cadastrarMaquina(hostName, nomeDono, ultimoNomeDono, sistemaOperacional, status, idGestor) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", hostName, nomeDono, ultimoNomeDono, sistemaOperacional, status, idGestor);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO Maquina (hostName, nomeDono, sobrenomeDono, sistemaOperacional, status, fkGestor) VALUES (
        '${hostName}', '${nomeDono}', '${ultimoNomeDono}', '${sistemaOperacional}', ${status}, ${idGestor});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarProcessosSeremEncerrados(processo, idMaquina) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarProcessosSeremEncerrados():", processo, idMaquina);

    var instrucao = `
        INSERT INTO Processo (nomeProcesso, fkMaquina) VALUES (
        '${processo}', ${idMaquina});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getIdMaquinaCadastrada(idGestor) {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function getDadosMaquinaCadastrada()");
    var instrucao = `
        SELECT idMaquina FROM Maquina WHERE fkGestor = ${idGestor} ORDER BY idMaquina DESC LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarMaquinas(idGestor) {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM Maquina WHERE fkGestor = ${idGestor} AND STATUS = 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarMaquinasInativas(idGestor) {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarMaquinasInativas()");
    var instrucao = `
        SELECT * FROM Maquina WHERE fkGestor = ${idGestor} AND STATUS = 0;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosMaquina(idMaquina) {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function getDadosMaquina()");
    var instrucao = `
        SELECT * FROM Maquina WHERE idMaquina = '${idMaquina}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editarMaquina(novoHostName, novoNomeDono, novoUltimoNomeDono, novoSO, novoStatus, idMaquina) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", novoHostName, novoNomeDono, novoUltimoNomeDono, novoSO, novoStatus, idMaquina);
    
    let atividade = null;
    if (novoStatus == "ativo") {
        atividade = 1
    } else if (novoStatus == "inativo") {
        atividade = 0
    }

    var instrucao = `
        UPDATE Maquina SET hostName = '${novoHostName}', nomeDono = '${novoNomeDono}', sobrenomeDono = '${novoUltimoNomeDono}', sistemaOperacional = '${novoSO}', status = ${atividade} WHERE idMaquina = ${idMaquina};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletarMaquina(idMaquina) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletarMaquina():", idMaquina);
    var instrucao = `
        DELETE FROM Maquina WHERE idMaquina = ${idMaquina};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    getIdMaquinaCadastrada,
    cadastrarMaquina,
    cadastrarProcessosSeremEncerrados,
    listarMaquinas,
    listarMaquinasInativas,
    getDadosMaquina,
    editarMaquina,
    deletarMaquina
};