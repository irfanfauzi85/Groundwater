// Create the charts when the web page loads
window.addEventListener("load", onload);

function onload(event) {
  temperatureChart = createTemperatureChart();
  tdsChart = createTdsChart();
  turbidityChart = createTurbidityChart();
  phChart = createPhChart();
}

// Membuat Chart
function createTemperatureChart() {
  var chart = new Highcharts.Chart({
    chart: {
      renderTo: "grafik-suhu",
      type: "spline",
    },
    series: [
      {
        name: "suhu",
      },
    ],
    title: {
      text: undefined,
    },
    plotOptions: {
      line: {
        animation: false,
        dataLabels: {
          enabled: true,
        },
      },
      series: {
        color: "#2ae48b",
      },
    },
    xAxis: {
      type: "datetime",
      dateTimeLabelFormats: { second: "%H:%M:%S" },
    },
    yAxis: {
      title: {
        text: "Suhu (°C)",
      },
    },
    credits: {
      enabled: false,
    },
  });
  return chart;
}

// Create TDS Chart
function createTdsChart() {
  var chart = new Highcharts.Chart({
    chart: {
      renderTo: "grafik-tds",
      type: "spline",
    },
    series: [
      {
        name: "TDS",
      },
    ],
    title: {
      text: undefined,
    },
    plotOptions: {
      line: {
        animation: false,
        dataLabels: {
          enabled: true,
        },
      },
      series: {
        color: "#D10363",
      },
    },
    xAxis: {
      type: "datetime",
      dateTimeLabelFormats: { second: "%H:%M:%S" },
    },
    yAxis: {
      title: {
        text: "Total Dissolved Solid (PPM)",
      },
    },
    credits: {
      enabled: false,
    },
  });
  return chart;
}

// Create Turbidity Chart
function createTurbidityChart() {
  var chart = new Highcharts.Chart({
    chart: {
      renderTo: "grafik-kekeruhan",
      type: "spline",
    },
    series: [
      {
        name: "NTU",
      },
    ],
    title: {
      text: undefined,
    },
    plotOptions: {
      line: {
        animation: false,
        dataLabels: {
          enabled: true,
        },
      },
      series: {
        color: "#fdb62c",
      },
    },
    xAxis: {
      type: "datetime",
      dateTimeLabelFormats: { second: "%H:%M:%S" },
    },
    yAxis: {
      title: {
        text: "Kekeruhan (NTU)",
      },
    },
    credits: {
      enabled: false,
    },
  });
  return chart;
}

function createPhChart() {
  var chart = new Highcharts.Chart({
    chart: {
      renderTo: "grafik-ph",
      type: "spline",
    },
    series: [
      {
        name: "pH",
      },
    ],
    title: {
      text: undefined,
    },
    plotOptions: {
      line: {
        animation: false,
        dataLabels: {
          enabled: true,
        },
      },
      series: {
        color: "#3e68ff",
      },
    },
    xAxis: {
      type: "datetime",
      dateTimeLabelFormats: { second: "%H:%M:%S" },
    },
    yAxis: {
      title: {
        text: "Derajat Keasaman (pH)",
      },
    },
    credits: {
      enabled: false,
    },
  });
  return chart;
}
