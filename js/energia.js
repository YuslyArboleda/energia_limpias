document.addEventListener("DOMContentLoaded", () => {
  // Evento para cargar datos
  const btnCargar = document.getElementById("cargarDatos");
  if (btnCargar) {
    btnCargar.addEventListener("click", cargarDatos);
  }

  // Evento para calcular porcentaje renovable
  const formulario = document.getElementById("formulario-energia");
  if (formulario) {
    formulario.addEventListener("submit", calcularPorcentajeRenovable);
  }

  // Función para cargar datos con PapaParse
  function cargarDatos() {
    Papa.parse("data/renewable-energy.csv", {
      download: true,
      header: true,
      complete: function (results) {
        console.log(results.data);
        mostrarTabla(results.data);
      },
    });
  }

  // Mostrar datos en tabla
  function mostrarTabla(data) {
    const tablaDiv = document.getElementById("tablaDatos");
    if (!tablaDiv) return;

    let html = "<table class='table table-striped'><thead><tr>";

    // Encabezados
    const keys = Object.keys(data[0]);
    keys.forEach((key) => {
      html += `<th>${key}</th>`;
    });

    html += "</tr></thead><tbody>";

    // Filas
    data.forEach((row) => {
      html += "<tr>";
      keys.forEach((key) => {
        html += `<td>${row[key]}</td>`;
      });
      html += "</tr>";
    });

    html += "</tbody></table>";
    tablaDiv.innerHTML = html;
  }

  // Función de cálculo de porcentaje
  function calcularPorcentajeRenovable(event) {
    event.preventDefault();

    const consumo = parseFloat(document.getElementById("consumo").value);
    if (isNaN(consumo) || consumo <= 0) {
      alert("Ingresa un valor válido de consumo eléctrico.");
      return;
    }

    // Simulación: suma de capacidad instalada total (reemplaza con tus datos reales)
    const capacidadInstaladaTotal = 500; // ejemplo en kWh

    const porcentaje = (capacidadInstaladaTotal / consumo) * 100;
    const resultado = document.getElementById("resultado");
    resultado.textContent = `El ${porcentaje.toFixed(
      2
    )}% de tu consumo podría ser cubierto por energías renovables.`;
  }

  // Gráficos (ejemplo con datos simulados)
  // Bar Chart
  const ctxBar = document.getElementById("graficoBarras");
  if (ctxBar) {
    new Chart(ctxBar, {
      type: "bar",
      data: {
        labels: [
          "Eólica",
          "Solar",
          "Hidráulica",
          "Geotérmica",
          "Biocombustibles",
        ],
        datasets: [
          {
            label: "Producción (GWh)",
            data: [120, 90, 150, 30, 60],
            backgroundColor: [
              "#66bb6a",
              "#ffa726",
              "#42a5f5",
              "#ab47bc",
              "#ff7043",
            ],
          },
        ],
      },
    });
  }

  // Pie Chart
  const ctxPie = document.getElementById("graficoTorta");
  if (ctxPie) {
    new Chart(ctxPie, {
      type: "pie",
      data: {
        labels: [
          "Eólica",
          "Solar",
          "Hidráulica",
          "Geotérmica",
          "Biocombustibles",
        ],
        datasets: [
          {
            data: [25, 20, 35, 5, 15],
            backgroundColor: [
              "#66bb6a",
              "#ffa726",
              "#42a5f5",
              "#ab47bc",
              "#ff7043",
            ],
          },
        ],
      },
    });
  }

  // Line Chart
  const ctxLine = document.getElementById("graficoLineas");
  if (ctxLine) {
    new Chart(ctxLine, {
      type: "line",
      data: {
        labels: ["2018", "2019", "2020", "2021", "2022"],
        datasets: [
          {
            label: "Capacidad Instalada (GW)",
            data: [300, 350, 400, 450, 500],
            fill: false,
            borderColor: "#66bb6a",
          },
        ],
      },
    });
  }

  // Area Chart (Line con fill)
  const ctxArea = document.getElementById("graficoArea");
  if (ctxArea) {
    new Chart(ctxArea, {
      type: "line",
      data: {
        labels: ["2018", "2019", "2020", "2021", "2022"],
        datasets: [
          {
            label: "Energía Renovable (TWh)",
            data: [100, 120, 140, 160, 180],
            fill: true,
            backgroundColor: "rgba(102,187,106,0.2)",
            borderColor: "#66bb6a",
          },
          {
            label: "Energía Convencional (TWh)",
            data: [400, 390, 380, 370, 360],
            fill: true,
            backgroundColor: "rgba(244,67,54,0.2)",
            borderColor: "#f44336",
          },
        ],
      },
    });
  }
});
