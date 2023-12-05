var container_menu = document.getElementsByClassName("container_menu_bar")[0];
var icone_menu = document.getElementsByClassName("ph-list")[0];

function ver_menu() {
	container_menu.style.display = "flex";
}

function fechar_menu() {
	container_menu.style.display = "none";
}

function sair() {
	sessionStorage.clear();
	window.location = "../login.html";
}

function obterDadosGrafico(idAdega) {
	// alterarTitulo(idAdega);

	// if (proximaAtualizacao != undefined) {
	// 	clearTimeout(proximaAtualizacao);
	// }

	fetch(`/medidas/ultimas/${idAdega}`, { cache: "no-store" })
		.then(function (response) {
			if (response.ok) {
				console.log(response);
				response.json().then(function (resposta) {
					console.log(
						`Dados recebidos em obterGraficos: ${JSON.stringify(resposta)}`
					);
					resposta.medidaTemperatura.reverse();
					resposta.medidaUmidade.reverse();

					// plotarGrafico(resposta, idAdega);
				});
			} else {
				console.error("Nenhum dado encontrado ou erro na API");
			}
		})
		.catch(function (error) {
			console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
		});
}

window.onload = exibirAdegasDoUsuario();

function exibirAdegasDoUsuario() {
	var adegas = JSON.parse(sessionStorage.ADEGAS);
	console.log(`exibirAdegasDoUsuario:`, adegas);
	adegas.forEach((item) => {
		document.getElementById("select_adegas").innerHTML += `
				<option value="${item.idAdega}" onclick="obterDadosGrafico(${item.idAdega})">${item.nome}</option>
            `;
	});
	obterDadosGrafico(adegas[0].idAdega);
}

function plotarGrafico(resposta, idAdega) {
	console.log("iniciando plotagem do gráfico...");

	var bar_ocorrencias_dia = {
		type: "bar",
		data: {
			labels: [],
			datasets: [
				{
					label: "temperatura",
					data: [],
					borderWidth: 1,
					backgroundColor: "#FF6384",
				},
				{
					label: "umidade",
					data: [],
					borderWidth: 1,
					backgroundColor: "#FFCE56",
				},
			],
		},
		options: {
			scales: {
				y: {
					max: 80,
					beginAtZero: true,
					ticks: {
						color: "#FFF",
					},
				},
				x: {
					ticks: {
						color: "#FFF",
					},
				},
			},
			plugins: {
				legend: {
					position: "none",
				},
			},
		},
	};
	var column_total_ocorrencias = {
		type: "bar",
		data: {
			labels: ["Temperatura", "Umidade"],
			datasets: [
				{
					label: "# of Votes",
					data: [],
					backgroundColor: ["#FF6384", "#FFCE56"],
					borderWidth: 1,
				},
			],
		},
		options: {
			scales: {
				y: {
					beginAtZero: true,
					ticks: {
						color: "#FFF",
					},
				},
				x: {
					ticks: {
						color: "#FFF",
					},
				},
			},
			plugins: {
				legend: {
					position: "none",
				},
			},
		},
	};
	var pizza_total_ocorrencias = {
		type: "pie",
		data: {
			labels: [],
			datasets: [
				{
					data: [], // Valores percentuais para cada categoria
					backgroundColor: ["#FF6384", "#FFCE56"],
				},
			],
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				y: {
					beginAtZero: true,
					ticks: {
						color: "#FFF",
					},
				},
				x: {
					ticks: {
						color: "#FFF",
					},
				},
			},
			plugins: {
				legend: {
					position: "none",
				},
			},
		},
	};
	var linha_ocorrencias_data = document.getElementById("linhas_data_hora");
	var linha_ocorrencias_id = document.getElementById("linhas_id");
	var linha_ocorrencias_temp = document.getElementById("linhas_temperatura");
	var linha_ocorrencias_umid = document.getElementById("linhas_umidade");

	var temp_min = document.getElementById("tempMin");
	var temp_max = document.getElementById("tempMax");
	var umid_min = document.getElementById("umidMin");
	var umid_max = document.getElementById("umidMax");

	var tempAtual = document.getElementById("tempAtual");
	var umidAtual = document.getElementById("umidAtual");

	tempAtual = resposta.medidaTemperatura[0];
	umidAtual = resposta.medidaUmidade[0];

	dados_dias = [0, 0, 0, 0, 0, 0, 0];
	tempMinima = 15;
	tempMaxima = 0;
	umidMinima = 70;
	umidMaxima = 0;
	ocorrencias_temp = 0;
	ocorrencias_umid = 0;
	total_ocorrencias = 0;
	porcent_temp = 0;
	porcent_umid = 0;

	// Inserindo valores recebidos em estrutura para plotar o gráfico
	for (i = 0; i < resposta.medidaTemperatura.length; i++) {
		var registroTemp = resposta.medidaTemperatura[i];
		var registroUmid = resposta.medidaUmidade[i];

		if (registroTemp.temperatura >= 18) {
			ocorrencias_temp += 1;
			if (registroTemp.temperatura >= tempMaxima) {
				tempMaxima = registroTemp.temperatura;
			}
		} else if (registroTemp.temperatura <= 12) {
			ocorrencias_temp += 1;
			if (registroTemp.temperatura <= tempMinima) {
				tempMinima = registroTemp.temperatura;
			}
		}

		if (registroUmid.umidade >= 80) {
			ocorrencias_umid += 1;
			if (registroUmid.umidade >= umidMaxima) {
				umidMaxima = registroUmid.umidade;
			}
		} else if (registroUmid.umidade <= 70) {
			ocorrencias_umid += 1;
			if (registroUmid.umidade <= umidMinima) {
				umidMinima = registroUmid.umidade;
			}
		}
	}
	total_ocorrencias = ocorrencias_temp + ocorrencias_umid;
	porcent_temp = (ocorrencias_temp / total_ocorrencias) * 100;
	porcent_umid = (ocorrencias_umid / total_ocorrencias) * 100;

	column_total_ocorrencias.data.datasets[0].data = [
		ocorrencias_temp,
		ocorrencias_umid,
	];
	pizza_total_ocorrencias.data.datasets[0].data = [porcent_temp, porcent_umid];

	// labels.push(registro.momento_grafico);
	// resposta.data.datasets[0].data.push(registro.umidade);
	// resposta.data.datasets[1].data.push(registro.temperatura);

	// Adicionando gráfico criado em div na tela
	let myChart = new Chart(
		document.getElementById(`grafico_${idAdega}`),
		config
	);

	// setTimeout(() => atualizarGrafico(idAdega, dados, myChart), 2000);
}
