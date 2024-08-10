const hamBurger = document.querySelector(".toggle-btn");

hamBurger.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
});

// convert epochtime to JavaScripte Date object
function epochToJsDate(epochTime) {
  return new Date(epochTime * 1000);
}

// convert time to human-readable format YYYY/MM/DD HH:MM:SS
function epochToDateTime(epochTime) {
  var epochDate = new Date(epochToJsDate(epochTime));
  var dateTime =
    epochDate.getFullYear() +
    "/" +
    ("00" + (epochDate.getMonth() + 1)).slice(-2) +
    "/" +
    ("00" + epochDate.getDate()).slice(-2) +
    " " +
    ("00" + epochDate.getHours()).slice(-2) +
    ":" +
    ("00" + epochDate.getMinutes()).slice(-2) +
    ":" +
    ("00" + epochDate.getSeconds()).slice(-2);

  return dateTime;
}

// function to plot values on charts
function plotValues(chart, timestamp, value) {
  var x = epochToJsDate(timestamp).getTime();

  var y = Number(value);
  if (chart.series[0].data.length > 40) {
    chart.series[0].addPoint([x, y], true, true, true);
  } else {
    chart.series[0].addPoint([x, y], true, false, true);
  }
}

// DOM elements
const loginElement = document.querySelector("#login-form");
const contentElement = document.querySelector("#content-sign-in");
const userDetailsElement = document.querySelector("#user-details");
const authBarElement = document.querySelector("#authentication-bar");
const deleteButtonElement = document.getElementById("delete-button");
const deleteModalElement = document.getElementById("delete-modal");
const deleteDataFormElement = document.querySelector("#delete-data-form");
const viewDataButtonElement = document.getElementById("view-data-button");
const hideDataButtonElement = document.getElementById("hide-data-button");
const tableContainerElement = document.querySelector("#table-container");
const chartsRangeInputElement = document.getElementById("charts-range");
const loadDataButtonElement = document.getElementById("load-data");
const cardsCheckboxElement = document.querySelector(
  "input[name=cards-checkbox]"
);
const gaugesCheckboxElement = document.querySelector(
  "input[name=gauges-checkbox]"
);

// DOM elements for sensor readings
const cardsReadingsElement = document.querySelector("#cards-div");
const gaugesReadingsElement = document.querySelector("#gauges-div");
const chartsDivElement = document.querySelector("#charts-div");
const tempElement = document.getElementById("temp");
const humElement = document.getElementById("hum");
const presElement = document.getElementById("pres");
const updateElement = document.getElementById("lastUpdate");

var dbPath = "DataLogging/readings";
var chartPath = "/WQMS/range";

// Database references
var dbRef = firebase.database().ref(dbPath);
var chartRef = firebase.database().ref(chartPath);

// CHARTS
// Number of readings to plot on charts
var chartRange = 0;
// Get number of readings to plot saved on database (runs when the page first loads and whenever there's a change in the database)
chartRef.on("value", (snapshot) => {
  chartRange = Number(snapshot.val());
  console.log(chartRange);
  // Delete all data from charts to update with new values when a new range is selected
  temperatureChart.destroy();
  tdsChart.destroy();
  turbidityChart.destroy();
  phChart.destroy();
  // Render new charts to display new range of data
  temperatureChart = createTemperatureChart();
  tdsChart = createTdsChart();
  turbidityChart = createTurbidityChart();
  phChart = createPhChart();
  // Update the charts with the new range
  // Get the latest readings and plot them on charts (the number of plotted readings corresponds to the chartRange value)
  dbRef
    .orderByKey()
    .limitToLast(chartRange)
    .on("child_added", (snapshot) => {
      var jsonData = snapshot.toJSON(); // example: {temperature: 25.02, humidity: 50.20, pressure: 1008.48, timestamp:1641317355}
      // Save values on variables
      var suhu = jsonData.suhu;
      var tds = jsonData.tds;
      var kekeruhan = jsonData.kekeruhan;
      var ph = jsonData.ph;
      var timestamp = jsonData.timestamp;

      // console.log(timestamp);

      var UTC = parseInt(timestamp);
      // console.log(typeof UTC);
      var tambah = 25200;
      var waktunum = UTC + tambah;
      var waktustring = waktunum.toString();

      // console.log(waktustring);

      // console.log(local);

      // console.log(local);

      // console.log(temperature);
      // Plot the values on the charts
      plotValues(temperatureChart, waktustring, suhu);
      plotValues(tdsChart, waktustring, tds);
      plotValues(turbidityChart, waktustring, kekeruhan);
      plotValues(phChart, waktustring, ph);
    });
});

// Update database with new range (input field)
chartsRangeInputElement.onchange = () => {
  chartRef.set(chartsRangeInputElement.value);
};

// let ph;

// phValue.on("value", function (getdata1) {
//   ph = getdata1.val();
//   // document.getElementById("ph").innerHTML = ph;
//   console.log(ph);

//   const dataPh = {
//     labels: [0],
//     datasets: [
//       {
//         label: "pH",
//         data: [0],
//         borderColor: "#3e68ff",
//         lineTension: 0.5,
//         backgroundColor: "#3e68ff",
//       },
//     ],
//   };

//   const configPh = {
//     type: "line",
//     data: dataPh,
//     options: {
//       scales: {
//         y: {
//           min: 0,
//           max: 14,
//         },
//       },
//     },
//   };

//   const myChartPh = new Chart(document.getElementById("myChartPh"), configPh);

//   window.setInterval(myCallback2, 2000);
//   function myCallback2() {
//     const d = new Date();
//     const hours = d.getHours();
//     const minutes = d.getMinutes();
//     const seconds = d.getSeconds();
//     const now = `${hours}:${minutes}:${seconds}`;
//     let x = Math.floor(Math.random() * 100 + 1);
//     if (dataPh.datasets[0].data.length >= 10) {
//       dataPh.labels.shift();
//       dataPh.datasets[0].data.shift();
//     }
//     dataPh.labels.push(now);
//     dataPh.datasets[0].data.push(ph);

//     myChartPh.update();
//   }
// });

// Tds
// let tds;
// tdsValue.on("value", function (getdata) {
//   tds = getdata.val();
//   console.log(tds);
//   // Tds
//   const dataTds = {
//     labels: [],
//     datasets: [
//       {
//         label: "TDS",
//         data: [0],
//         borderColor: " #2ae48b",
//         lineTension: 0.5,
//         backgroundColor: " #2ae48b",
//       },
//     ],
//   };

//   const configTds = {
//     type: "line",
//     data: dataTds,
//     options: {
//       scales: {
//         y: {
//           min: 0,
//           max: 1000,
//         },
//       },
//     },
//   };

//   const myChartTds = new Chart(
//     document.getElementById("myChartTds"),
//     configTds
//   );

//   window.setInterval(myCallback3, 2000);
//   function myCallback3() {
//     const d = new Date();
//     const hours = d.getHours();
//     const minutes = d.getMinutes();
//     const seconds = d.getSeconds();
//     const now = `${hours}:${minutes}:${seconds}`;
//     let x = Math.floor(Math.random() * 100 + 1);
//     if (dataTds.datasets[0].data.length >= 10) {
//       dataTds.labels.shift();
//       dataTds.datasets[0].data.shift();
//     }
//     dataTds.labels.push(now);
//     dataTds.datasets[0].data.push(tds);

//     myChartTds.update();
//   }
// });

// let kekeruhan;
// kekeruhanValue.on("value", function (getdata1) {
//   kekeruhan = getdata1.val();
//   console.log(kekeruhan);

//   const dataNtu = {
//     labels: [],
//     datasets: [
//       {
//         label: "Kekeruhan",
//         data: [0],
//         borderColor: "#fdb62c",
//         lineTension: 0.5,
//         backgroundColor: "#fdb62c",
//       },
//     ],
//   };

//   const configNtu = {
//     type: "line",
//     data: dataNtu,
//     options: {
//       scales: {
//         y: {
//           min: 0,
//           max: 3000,
//         },
//       },
//     },
//   };

//   const myChartNtu = new Chart(
//     document.getElementById("myChartNtu"),
//     configNtu
//   );

//   function myCallback4() {
//     const d = new Date();
//     const hours = d.getHours();
//     const minutes = d.getMinutes();
//     const seconds = d.getSeconds();
//     const now = `${hours}:${minutes}:${seconds}`;
//     let x = Math.floor(Math.random() * 100 + 1);
//     if (dataNtu.datasets[0].data.length >= 10) {
//       dataNtu.labels.shift();
//       dataNtu.datasets[0].data.shift();
//     }
//     dataNtu.labels.push(now);
//     dataNtu.datasets[0].data.push(kekeruhan);

//     myChartNtu.update();
//   }

//   window.setInterval(myCallback4, 2000);
// });
