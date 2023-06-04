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

    console.log("Medida ideal componentes: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function espacoDisponivelComponentesVisaoGeral(idMaquina) {

    instrucaoSql = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT 
                            c.idComponente, 
                            c.total, 
                            l.emUso, 
                            c.fkMaquina
                            FROM Componente c
                            LEFT JOIN (
                                SELECT fkComponente, emUso
                                FROM (
                                    SELECT fkComponente, emUso,
                                        ROW_NUMBER() OVER (PARTITION BY fkComponente ORDER BY momentoCaptura DESC) AS rn
                                    FROM Log
                                ) sub
                                WHERE rn = 1
                            ) l ON c.idComponente = l.fkComponente
                            WHERE c.fkMaquina = ${idMaquina}
                                AND c.nomeComponente = 'Disco Rígido';`;
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
                            CONVERT(date, Log.momentoCaptura),
                            DATENAME(weekday, CONVERT(date, Log.momentoCaptura)) AS Semana
                                FROM Componente JOIN Log 
                                    ON idComponente = fkComponente
                                WHERE Componente.fkMaquina = ${idMaquina}
                                    AND nomeComponente = 'Memória RAM'
                                    AND CONVERT(date, Log.momentoCaptura) >= CONVERT(date, DATEADD(DAY, -3, GETDATE()))
                                GROUP BY CONVERT(date, Log.momentoCaptura);`;
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
                                    AND Log.emUso > (NivelAlerta.nivelAlerta * Componente.total / 100 * 0.8)
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
                                    AND CONVERT(date, Log.momentoCaptura) >= CONVERT(date, DATEADD(DAY, -7, GETDATE()))
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
                                    AND CONVERT(date, Log.momentoCaptura) >= CONVERT(date, DATEADD(DAY, -7, GETDATE()))
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

function ramEmTempoReal(idMaquina) {
    instrucaoSql = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT TOP 8
                            Log.emUso,
                                FORMAT(Log.momentoCaptura, 'hh:mm:ss') AS horario
                                FROM Componente 
                                JOIN Log 
                                    ON idComponente = fkComponente
                                WHERE Componente.fkMaquina = ${idMaquina}
                                    AND nomeComponente = 'Memória RAM'
                                ORDER BY idLog desc;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function informacoesLegendaDisco(idMaquina) {
    instrucaoSql = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT 
                            c.nomeComponente, 
                            c.total, 
                            l.emUso, 
                            n.nivelAlerta,
                            c.fkMaquina
                            FROM Componente c
                            LEFT JOIN (
                                SELECT fkComponente, emUso
                                FROM (
                                    SELECT fkComponente, emUso,
                                        ROW_NUMBER() OVER (PARTITION BY fkComponente ORDER BY momentoCaptura DESC) AS rn
                                    FROM Log
                                ) sub
                                WHERE rn = 1
                            ) l ON c.idComponente = l.fkComponente
                            JOIN NivelAlerta n on c.idComponente = n.fkComponente
                            WHERE c.fkMaquina = ${idMaquina}
                                AND c.nomeComponente = 'Disco Rígido';`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function mediaUsoDiscoSemana(idMaquina) {

    instrucaoSql = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT 
                            Componente.idComponente,
                            AVG(Log.emUso) AS Media,
                            CONVERT(date, Log.momentoCaptura),
                            DATENAME(weekday, CONVERT(date, Log.momentoCaptura)) AS Semana
                                FROM Componente 
                                JOIN Log 
                                    ON idComponente = fkComponente
                                WHERE Componente.fkMaquina = ${idMaquina}
                                    AND nomeComponente = 'Disco Rígido'
                                    AND CONVERT(date, Log.momentoCaptura) >= DATEADD(DAY, -7, GETDATE())
                                GROUP BY CONVERT(date, Log.momentoCaptura), Componente.idComponente;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function totalJanelasEncerradas(idMaquina) {

    instrucaoSql = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT 
                            COUNT(idJanelaEncerrada) as quantidade
                        FROM JanelaEncerrada 
                        WHERE fkMaquina = ${idMaquina}
                            AND momentoEncerrado >= DATEADD(WEEK, -2, GETDATE());`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function historicoJanelaEncerrada(idMaquina) {

    instrucaoSql = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT 
                            nomeJanela,
                            CONVERT(varchar(19), momentoEncerrado, 120) AS dataHoraEncerrado
                        FROM JanelaEncerrada 
                        WHERE fkMaquina = ${idMaquina}
                            AND momentoEncerrado >= DATEADD(WEEK, -2, GETDATE());`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function rankingJanelaEncerrada(idMaquina) {

    instrucaoSql = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT
                            ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC) AS posicao,
                            nomeJanela,
                            COUNT(*) AS quantidade
                        FROM JanelaEncerrada
                        WHERE fkMaquina = ${idMaquina}
                            AND momentoEncerrado >= DATEADD(WEEK, -2, GETDATE())
                        GROUP BY nomeJanela
                        ORDER BY posicao;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function alerta(idMaquina) {

    instrucaoSql = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT
                            Componente.nomeComponente
                        FROM Componente
                        JOIN NivelAlerta ON Componente.idComponente = NivelAlerta.fkComponente
                        JOIN Log ON Componente.idComponente = Log.fkComponente
                        WHERE Componente.fkMaquina = ${idMaquina}
                            AND Log.emUso > (Componente.total * NivelAlerta.nivelAlerta / 100 * 0.8)
                            AND Log.momentoCaptura >= DATEADD(WEEK, -1, GETDATE())
                        GROUP BY Componente.nomeComponente;`
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
    informacoesLegendaRam,
    ramEmTempoReal,
    informacoesLegendaDisco,
    mediaUsoDiscoSemana,
    totalJanelasEncerradas,
    historicoJanelaEncerrada,
    rankingJanelaEncerrada,
    alerta
}
