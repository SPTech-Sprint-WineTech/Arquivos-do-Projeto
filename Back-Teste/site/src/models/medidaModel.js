var database = require("../database/config");

function buscarUltimasMedidas(idAdega, limite_linhas) {
	instrucaoSql = "";

	if (process.env.AMBIENTE_PROCESSO == "producao") {
		instrucaoSql = `select top ${limite_linhas}
        dht11_temperatura as temperatura,
        dht11_umidade as umidade,
                        momento,
                        FORMAT(momento, 'HH:mm:ss') as momento_grafico
                    from medida
                    where fk_aquario = ${idAdega}
                    order by id desc`;
	} else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
		instrucaoSql = `select dS.registro as temperatura, dS.leitura, DATE_FORMAT(dS.leitura, '%H:%i:%s') as momento_grafico from dadosSensor as dS
join sensor as s on s.idSensor = dS.fkSensor
where s.fkAdega = ${idAdega} and s.tipo = 'LM35' order by dS.idDados desc limit ${limite_linhas}
`;
	} else {
		console.log(
			"\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
		);
		return;
	}

	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idAdega) {
	instrucaoSql = "";

	if (process.env.AMBIENTE_PROCESSO == "producao") {
		instrucaoSql = `select top 1
        dht11_temperatura as temperatura,
        dht11_umidade as umidade,
                        CONVERT(varchar, momento, 108) as momento_grafico,
                        fk_aquario
                        from medida where fk_aquario = ${idAdega}
                    order by id desc`;
	} else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
		instrucaoSql = `select dS.registro as temperatura, dS.leitura, DATE_FORMAT(dS.leitura, '%H:%i:%s') as momento_grafico from dadosSensor as dS
join sensor as s on s.idSensor = dS.fkSensor
where s.fkAdega = ${idAdega} and s.tipo = 'LM35' order by dS.idDados desc limit 1`;
	} else {
		console.log(
			"\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
		);
		return;
	}

	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

module.exports = {
	buscarUltimasMedidas,
	buscarMedidasEmTempoReal,
};
