var database = require("../database/config")

function listarGestores(idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM Gestor WHERE fkInstituicao = '${idEmpresa}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(cnpj, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", cnpj, email, senha)
    var instrucao = `
        SELECT * FROM Instituicao WHERE cnpj = '${cnpj}' OR email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrarGestor(email,senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM Gestor WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrarEmpresa(razaoSoc, cnpj, email, cep, log, bairro, num, comp, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", razaoSoc, cnpj, email, cep, log, bairro, num, comp, senha);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO Instituicao (razao_social, cnpj, email, cep, numero, complemento, senha) VALUES (
        '${razaoSoc}', '${cnpj}', '${email}', '${cep}', ${num}, '${comp}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarGestor(nomeGestor, sobrenome, cargo, email, senha, status, idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomeGestor, sobrenome, cargo, email, senha, status, idEmpresa);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO Gestor (nome, sobrenome, cargo, email, senha, status, fkInstituicao) VALUES (
        '${nomeGestor}', '${sobrenome}', '${cargo}', '${email}','${senha}', '${status}', '${idEmpresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editarGestor(novoNomeGestor, novoSobrenome, novoCargo, novoEmail, novaSenha, novoStatus, idGestor) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", novoNomeGestor, novoSobrenome, novoCargo, novoEmail, novaSenha, novoStatus, idGestor);
    
    let atividade = null;
    if (novoStatus == "ativo") {
        atividade = 1
    } else if (novoStatus == "inativo") {
        atividade = 0
    }

    var instrucao = `
        UPDATE Gestor SET nome = '${novoNomeGestor}', sobrenome = '${novoSobrenome}', cargo = '${novoCargo}', email = '${novoEmail}', senha = ${novaSenha}, status = ${atividade} WHERE idGestor = ${idGestor};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosGestor(idGestor) {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function getDadosGestor()");
    var instrucao = `
        SELECT * FROM Gestor WHERE idGestor = '${idGestor}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    entrar,
    entrarGestor,
    cadastrarEmpresa,
    cadastrarGestor,
    listarGestores,
    editarGestor,
    getDadosGestor,
};