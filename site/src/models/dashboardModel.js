var database = require("../database/config");

function medidaIdealComponentes(idMaquina) {

    instrucaoSql = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT 
            Componente.idComponente, 
            Componente.nomeComponente, 
            Componente.total, 
            NivelAlerta.nivelAlerta  
                FROM Componente 
                    JOIN NivelAlerta 
                        ON idComponente = fkComponente
                WHERE Componente.fkMaquina = ${idMaquina};`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function espacoDisponivelComponentesVisaoGeral(idMaquina) {

    instrucaoSql = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT
                            DISTINCT Componente.idComponente, 
                            Componente.total, 
                            COALESCE(Log.emUso, 0) as emUso,
                            Componente.fkMaquina
                                FROM Componente 
                                LEFT JOIN Log 
                                    ON idComponente = fkComponente
                                WHERE Componente.fkMaquina = ${idMaquina}
                                    AND nomeComponente = 'Disco Rígido';`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function ramUltimos3DiasVisaoGeral(idMaquina) {

    instrucaoSql = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT 
                            AVG(Log.emUso) AS Media,
                            Log.momentoCaptura,
                            DATENAME(weekday, Log.momentoCaptura) AS Semana
                                FROM Componente 
                                JOIN Log 
                                    ON idComponente = fkComponente
                                WHERE Componente.fkMaquina = ${idMaquina}
                                    AND nomeComponente = 'Memória RAM'
                                    AND TRY_CONVERT(datetime, Log.momentoCaptura, 103) >= DATEADD(DAY, -3, GETDATE())
                                GROUP BY momentoCaptura;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function diasCpuLimiteVisaoGeral(idMaquina) {

    instrucaoSql = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT 
                            CAST(Log.momentoCaptura AS DATE) AS data, 
                            COUNT(*) AS diasUltrapassados
                                FROM Log
                            JOIN Componente ON 
                                Componente.idComponente = Log.fkComponente
                            JOIN NivelAlerta ON 
                            Componente.idComponente = NivelAlerta.fkComponente
                                WHERE Log.momentoCaptura >= DATEADD(DAY, -7, GETDATE())
                                    AND Log.emUso > (NivelAlerta.nivelAlerta * Componente.total / 100)
                                    AND Componente.nomeComponente = 'Processador'
                                    AND Componente.fkMaquina = ${idMaquina}
                                GROUP BY CAST(Log.momentoCaptura AS DATE);`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function mediaUsoRamSemanaVisaoGeral(idMaquina) {

    instrucaoSql = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT 
                            AVG(Log.emUso) AS Media,
                            CONVERT(date, Log.momentoCaptura),
                            DATENAME(weekday, CONVERT(date, Log.momentoCaptura)) AS Semana
                                FROM Componente JOIN Log 
                                    ON idComponente = fkComponente
                                WHERE Componente.fkMaquina = ${idMaquina}
                                    AND nomeComponente = 'Memória RAM'
                                    AND CONVERT(date, Log.momentoCaptura) >= DATEADD(DAY, -7, GETDATE())
                                GROUP BY CONVERT(date, Log.momentoCaptura);`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function mediaUsoCpuSemanaVisaoGeral(idMaquina) {

    instrucaoSql = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT 
                            AVG(Log.emUso) AS Media,
                            CONVERT(date, Log.momentoCaptura),
                            DATENAME(weekday, CONVERT(date, Log.momentoCaptura)) AS Semana
                                FROM Componente 
                                JOIN Log 
                                    ON idComponente = fkComponente
                                WHERE Componente.fkMaquina = ${idMaquina}
                                    AND nomeComponente = 'Processador'
                                    AND CONVERT(date, Log.momentoCaptura) >= DATEADD(DAY, -7, GETDATE())
                                GROUP BY CONVERT(date, Log.momentoCaptura);`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function informacoesDonoMaquina(idMaquina) {

    instrucaoSql = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT 
                            Maquina.nomeDono,
                            Maquina.sobrenomeDono,
                            Maquina.sistemaOperacional,
                            Maquina.hostName,
                            Componente.nomeComponente,
                            Componente.total,
                            Componente.modelo
                                FROM Maquina JOIN Componente on idMaquina = fkMaquina
                                    WHERE Maquina.idMaquina = ${idMaquina};`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function informacoesLegendaCpu(idMaquina) {
    instrucaoSql = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT 
                            Componente.nomeComponente, 
                            Componente.total, 
                            NivelAlerta.nivelAlerta 
                        FROM Componente JOIN NivelAlerta ON
                            idComponente = fkComponente
                        WHERE Componente.fkMaquina = ${idMaquina}
                        AND Componente.nomeComponente = 'Processador';`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cpuEmTempoReal(idMaquina) {
    instrucaoSql = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT TOP 8
                            Log.emUso,
                                FORMAT(Log.momentoCaptura, 'hh:mm:ss') AS horario
                                FROM Componente 
                                JOIN Log 
                                    ON idComponente = fkComponente
                                WHERE Componente.fkMaquina = ${idMaquina}
                                    AND nomeComponente = 'Processador'
                                ORDER BY idLog desc;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function informacoesLegendaRam(idMaquina) {
    instrucaoSql = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT 
                            Componente.nomeComponente, 
                            Componente.total, 
                            NivelAlerta.nivelAlerta 
                        FROM Componente JOIN NivelAlerta ON
                            idComponente = fkComponente
                        WHERE Componente.fkMaquina = ${idMaquina}
                        AND Componente.nomeComponente = 'Memória RAM';`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    medidaIdealComponentes,
    espacoDisponivelComponentesVisaoGeral,
    ramUltimos3DiasVisaoGeral,
    diasCpuLimiteVisaoGeral,
    mediaUsoRamSemanaVisaoGeral,
    mediaUsoCpuSemanaVisaoGeral,
    informacoesDonoMaquina,
    informacoesLegendaCpu,
    cpuEmTempoReal,
    informacoesLegendaRam
}
