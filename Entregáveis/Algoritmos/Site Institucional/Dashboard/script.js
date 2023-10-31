function fechar_modal_graficos() {
	var modal_graficos = document.getElementById("modal_graficos");
	var card_adegas = document.getElementById("card_adegas");
	modal_graficos.style.display = "none";
	card_adegas.style.display = "flex";

	var grafico_temp = document.getElementById("chart_temp");
	var grafico_umid = document.getElementById("chart_umid");
	var container_kpi_temp = document.getElementById("container_temp");
	var container_kpi_umid = document.getElementById("container_umid");
	var kpi_temp = document.getElementById("kpi_temperatura");
	var kpi_umid = document.getElementById("kpi_umidade");

	grafico_temp.style = "width: 40%";
	grafico_temp.style = "display: block";
	grafico_umid.style = "width: 40%";
	grafico_umid.style = "display: block";
	kpi_temp.style = "display: block";
	container_kpi_temp.style = "display: flex";
	kpi_umid.style = "display: block";
	container_kpi_umid.style = "display: flex";
}

//Fazer o card em alerta piscar assim que a página carregar
window.onload = function () {
	background_piscando();
};

function background_piscando() {
	var adega02 = document.getElementById("adega_02");
	adega02.classList.add("pulsating-background");
}

function ver_adega_01() {
	span_temperatura_estado_atual.innerHTML = "Saudável";
	span_umidade_estado_atual.innerHTML = "Saudável";
	span_temperatura_atual.innerHTML = "15C°";
	span_umidade_atual.innerHTML = "75%";

	var modal_graficos = document.getElementById("modal_graficos");
	modal_graficos.style.display = "flex";

	var charts_existentes = modal_graficos.querySelectorAll(".chart canvas");
	charts_existentes.forEach(function (chart) {
		chart.remove();
	});

	var chart_containers = document.querySelectorAll(
		".container_graficos .chart"
	);

	chart_containers.forEach(function (chart_container, index) {
		var canvas = document.createElement("canvas");
		canvas.id = index === 0 ? "grafico_temperatura" : "grafico_umidade";
		chart_container.appendChild(canvas);

		if (index === 0) {
			// Gráfico de Temperatura
			new Chart(canvas, {
				type: "line",
				data: {
					labels: ["12:00", "12:01", "12:02", "12:03", "12:04", "12:05"],
					datasets: [
						{
							label: "Temperatura",
							data: [19, 20, 19, 20, 21, 20],
							backgroundColor: "green",
							borderColor: "green",
							borderWidth: 2,
						},
					],
				},
				options: {
					scales: {
						x: {
							grid: {
								color: "rgba(255, 255, 255, 0.212)",
							},
						},
						y: {
							suggestedMin: 0,
							suggestedMax: 40,
							stepSize: 10,
							grid: {
								color: "rgba(255, 255, 255, 0.212)",
							},
						},
					},
				},
			});
		} else {
			// Gráfico de Umidade
			new Chart(canvas, {
				type: "line",
				data: {
					labels: ["12:00", "12:01", "12:02", "12:03", "12:04", "12:05"],
					datasets: [
						{
							label: "Umidade",
							data: [70, 71, 73, 71, 75, 75],
							backgroundColor: "green",
							borderColor: "green",
							borderWidth: 2,
						},
					],
				},
				options: {
					scales: {
						x: {
							grid: {
								color: "rgba(255, 255, 255, 0.212)",
							},
						},
						y: {
							suggestedMin: 50,
							suggestedMax: 100,
							stepSize: 10,
							grid: {
								color: "rgba(255, 255, 255, 0.212)",
							},
						},
					},
				},
			});
		}
	});
}

function mostrar_modal_alerta() {
	var modal_alerta = document.getElementById("modal_alerta");
	var modal_graficos = document.getElementById("modal_graficos");
	var card_adegas = document.getElementById("card_adegas");

	modal_alerta.style.display = "flex";
	modal_graficos.style.display = "none";
	card_adegas.style.display = "none";
}

function fechar_modal_alerta() {
	var modal_alerta = document.getElementById("modal_alerta");
	var modal_graficos = document.getElementById("modal_graficos");
	var card_adegas = document.getElementById("card_adegas");

	modal_alerta.style.display = "none";
	modal_graficos.style.display = "flex";
	card_adegas.style.display = "flex";

	ver_adega_02();
}

function ver_adega_02() {
  span_temperatura_estado_atual.innerHTML = "Crítico, diminua a temperatura!";
  span_umidade_estado_atual.innerHTML = "Alerta, aumente a umidade";
  span_temperatura_atual.innerHTML = "26°C";
  span_umidade_atual.innerHTML = "67%";

	var modal_graficos = document.getElementById("modal_graficos");
	modal_graficos.style.display = "flex";

	var charts_existentes = modal_graficos.querySelectorAll(".chart canvas");
	charts_existentes.forEach(function (chart) {
		chart.remove();
	});

	var chart_containers = document.querySelectorAll(
		".container_graficos .chart"
	);

	chart_containers.forEach(function (chart_container, index) {
		var canvas = document.createElement("canvas");
		canvas.id = index === 0 ? "grafico_temperatura" : "grafico_umidade";
		chart_container.appendChild(canvas);

    if (index === 0) {
      // Gráfico de Temperatura
      new Chart(canvas, {
        type: "line",
        data: {
          labels: ["12:00", "12:01", "12:02", "12:03", "12:04", "12:05"],
          datasets: [
            {
              label: "Temperatura",
              data: [23, 22, 24, 25, 23, 26],
              backgroundColor: "red",
              borderColor: "red",
              borderWidth: 2,
            },
          ],
        },
        options: {
          scales: {
            x: {
              grid: {
                color: "rgba(255, 255, 255, 0.212)",
              },
            },
            y: {
              suggestedMin: 0,
              suggestedMax: 40,
              stepSize: 10,
              grid: {
                color: "rgba(255, 255, 255, 0.212)",
              },
            },
          },
        },
      });
    } else {
      // Gráfico de Umidade
      new Chart(canvas, {
        type: "line",
        data: {
          labels: ["12:00", "12:01", "12:02", "12:03", "12:04", "12:05"],
          datasets: [
            {
              label: "Umidade",
              data: [74, 72, 74, 73, 71, 67],
              backgroundColor: "red",
              borderColor: "red",
              borderWidth: 2,
            },
          ],
        },
        options: {
          scales: {
            x: {
              grid: {
                color: "rgba(255, 255, 255, 0.212)",
              },
            },
            y: {
              suggestedMin: 50,
              suggestedMax: 100,
              stepSize: 10,
              grid: {
                color: "rgba(255, 255, 255, 0.212)",
              },
            },
          },
        },
      });
    }
  });
}

function expandir_grafico(i) {
	var grafico_clicado = i;
	var grafico_temp = document.getElementById("chart_temp");
	var grafico_umid = document.getElementById("chart_umid");
	var container_kpi_temp = document.getElementById("container_temp");
	var container_kpi_umid = document.getElementById("container_umid");
	var kpi_temp = document.getElementById("kpi_temperatura");
	var kpi_umid = document.getElementById("kpi_umidade");

	if (grafico_clicado == `temp`) {
		grafico_temp.style = "width: 100%";
		grafico_temp.style = "display: flex";
		grafico_temp.style = "justify-content: center";
		grafico_umid.style = "display: none";
		container_kpi_temp.style = "display: flex";
		// container_kpi_temp.style = "width: 100%;";
		container_kpi_umid.style = "display: none";
	}
	else if (grafico_clicado == `umid`) {
		container_kpi_temp.style = "display: none;";
		container_kpi_umid.style = "display: flex;";
		// container_kpi_umid.style = "width: 100%;";
		grafico_temp.style = "display: none";
		grafico_umid.style = "width: 100%";
		grafico_umid.style = "display: flex";
		grafico_umid.style = "justify-content: center";
	} else {
		alert(`erro`);
	}
}
