document.addEventListener("DOMContentLoaded", function () {
  const arrowDownButton = document.getElementById("arrow-down-button");
  const infoBox = document.getElementById("info-box");

  arrowDownButton.addEventListener("click", function (e) {
    e.stopPropagation();

    if (infoBox.style.display === "block") {
      infoBox.style.display = "none";
    } else {
      infoBox.style.display = "block";
    }
  });

  document.addEventListener("click", function (e) {
    if (infoBox.style.display === "block" && e.target !== infoBox) {
      infoBox.style.display = "none";
    }
  });

  infoBox.addEventListener("click", function (e) {
    e.stopPropagation();
  });
});

function verAdega01() {
  span_temperatura_estado_atual.innerHTML = "Saudável";
  span_umidade_estado_atual.innerHTML = "Saudável";
  span_temperatura_atual.innerHTML = "15C°";
  span_umidade_atual.innerHTML = "75%";

  var modal_graficos = document.getElementById("modal_graficos");
  modal_graficos.style.display = "flex";

  var existingCharts = modal_graficos.querySelectorAll(".chart canvas");
  existingCharts.forEach(function (chart) {
    chart.remove();
  });

  var chartContainers = document.querySelectorAll(".container_graficos .chart");

  chartContainers.forEach(function (chartContainer, index) {
    var canvas = document.createElement("canvas");
    canvas.id = index === 0 ? "grafico_temperatura" : "grafico_umidade";
    chartContainer.appendChild(canvas);

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
              data: [70, 71, 73, 71, 75, 78],
              backgroundColor: "blue",
              borderColor: "blue",
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


function verAdega02() {
  span_temperatura_estado_atual.innerHTML = "Crítico, diminua a temperatura!";
  span_umidade_estado_atual.innerHTML = "Alerta, aumente a umidade";
  span_temperatura_atual.innerHTML = "26°C";
  span_umidade_atual.innerHTML = "73%";

  var modal_graficos = document.getElementById("modal_graficos");
  modal_graficos.style.display = "flex";

  var existingCharts = modal_graficos.querySelectorAll(".chart canvas");
  existingCharts.forEach(function (chart) {
    chart.remove();
  });

  var chartContainers = document.querySelectorAll(".container_graficos .chart");

  chartContainers.forEach(function (chartContainer, index) {
    var canvas = document.createElement("canvas");
    canvas.id = index === 0 ? "grafico_temperatura" : "grafico_umidade";
    chartContainer.appendChild(canvas);
    
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
              data: [60, 65, 62, 64, 61, 67],
              backgroundColor: "blue",
              borderColor: "blue",
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

  setTimeout(function () {
    alert("Temperatura em estado crítico, diminua o quanto antes! \nUmidade em estado de alerta, cuidado!");
  }, 1000);
}

// Função para fazer o background piscar
function fazerBackgroundPiscar() {
  var adega02 = document.getElementById("adega_02");
  adega02.classList.add("pulsating-background");
}

// Evento que chama a função quando a página é carregada
window.onload = function () {
  fazerBackgroundPiscar();
};

function fechar_modal() {
  var modal_graficos = document.getElementById("modal_graficos"); // substitua 'modal_graficos' pelo ID da sua div
  modal_graficos.style.display = "none";
}
