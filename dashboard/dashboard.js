const hamBurger = document.querySelector(".toggle-btn");

hamBurger.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
const firebaseConfig = {
  apiKey: "AIzaSyDMvshvjpAT2Di9qMOe1lc1iVCP1Q--fgM",
  authDomain: "wqms-81d27.firebaseapp.com",
  databaseURL: "https://wqms-81d27-default-rtdb.firebaseio.com",
  projectId: "wqms-81d27",
  storageBucket: "wqms-81d27.appspot.com",
  messagingSenderId: "49969250289",
  appId: "1:49969250289:web:b490ce775fb2435dbe4e50",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// getting reference to the database
const database = firebase.database();

//getting reference to the data we want
const dataSuhu = database.ref("WQMS/suhu");
const dataPh = database.ref("WQMS/ph");
const dataKekeruhan = database.ref("WQMS/kekeruhan");
const dataTds = database.ref("WQMS/tds");

//fetch the data
dataSuhu.on("value", function (getdata) {
  const suhuVal = getdata.val();

  document.getElementById("hasilpengukuransuhu").innerHTML = suhuVal;

  var warna = "";

  if (suhuVal <= 40) {
    warna = "#2ae48b";
  } else {
    warna = "#C80036";
  }

  var opts = {
    angle: 0, // The span of the gauge arc
    lineWidth: 0.44, // The line thickness
    radiusScale: 1, // Relative radius
    pointer: {
      length: 0.6, // // Relative to gauge radius
      strokeWidth: 0.035, // The thickness
      color: "#000000", // Fill color
    },
    limitMax: false, // If false, max value increases automatically if value > maxValue
    limitMin: false, // If true, the min value of the gauge will be fixed
    colorStart: warna, // Colors
    colorStop: warna, // just experiment with them
    strokeColor: "#E0E0E0", // to see which ones work best for you
    generateGradient: true,
    highDpiSupport: true, // High resolution support
  };
  var target = document.getElementById("fooSuhu"); // your canvas element
  var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!

  document.getElementById("suhu-textfield").className = "suhu-textfield";
  gauge.setTextField(document.getElementById("suhu-textfield"));
  gauge.maxValue = 100; // set max gauge value
  gauge.setMinValue(0); // Prefer setter over gauge.minValue = 0
  gauge.animationSpeed = 32; // set animation speed (32 is default value)
  gauge.set(suhuVal); // set actual value
});

dataPh.on("value", function (getdata1) {
  const phVal = getdata1.val();

  console.log(phVal);

  document.getElementById("ph-textfield").innerHTML = phVal;
  document.getElementById("hasilpengukuranph").innerHTML = phVal;

  var sph = "";


  if (phVal >= 6.5 && phVal <= 8.5) {
    sph = "baik";
  } else {
    sph = "tidak baik";
  }

  document.getElementById("statusph").innerHTML = sph;




  var optsph = {
    // color configs
    angle: 0,
    colorStart: "#6fadcf",
    colorStop: void 0,
    gradientType: 0,
    strokeColor: "#e0e0e0",
    generateGradient: true,
    percentColors: [
      [0.0, "#a9d70b"],
      [0.5, "#f9c802"],
      [1.0, "#ff0000"],
    ],
    // customize pointer
    pointer: {
      length: 0.6,
      strokeWidth: 0.035,
      iconScale: 1.0,
    },
    // static labels
    staticLabels: {
      font: "10px sans-serif",
      labels: [],
      fractionDigits: 0,
    },
    // static zones
    staticZones: [
      { strokeStyle: "#EF3624", min: 0, max: 1 },
      { strokeStyle: "#F33373", min: 1, max: 2 },
      { strokeStyle: "#F97C21", min: 2, max: 3 },
      { strokeStyle: "#FAAB25", min: 3, max: 4 },
      { strokeStyle: "#E8E435", min: 4, max: 5 },
      { strokeStyle: "#A5CC3B", min: 5, max: 6 },
      { strokeStyle: "#52B744", min: 6, max: 7 },
      { strokeStyle: "#019149", min: 7, max: 8 },
      { strokeStyle: "#069496", min: 8, max: 9 },
      { strokeStyle: "#5376B2", min: 9, max: 10 },
      { strokeStyle: "#484A9F", min: 10, max: 11 },
      { strokeStyle: "#323779", min: 11, max: 12 },
      { strokeStyle: "#93278F", min: 12, max: 13 },
      { strokeStyle: "#7A287B", min: 13, max: 14 },
    ],
  };
  var targetph = document.getElementById("fooph");
  var gaugeph = new Gauge(targetph).setOptions(optsph);

  document.getElementById("ph-textfield").className = "ph-textfield";
  //gaugeph.setTextField(document.getElementById("ph-textfield"));

  // var phaja = document.getElementById('ph-textfield')

  gaugeph.maxValue = 14;
  gaugeph.setMinValue(0);
  gaugeph.set(phVal);

  gaugeph.animationSpeed = 32;
});

dataTds.on("value", function (getdata1) {
  const tdsVal = getdata1.val();

  document.getElementById("hasilpengukurantds").innerHTML = tdsVal;

  var statustds = ""
  if (tdsVal > 0 && tdsVal <= 1000) {
    statustds = "baik"
  } else {
    statustds = "tidak baik"
  }

  document.getElementById("statustds").innerHTML = statustds;


  var warnatds = "#2ae48b";

  var optstds = {
    angle: 0, // The span of the gauge arc
    lineWidth: 0.44, // The line thickness
    radiusScale: 1, // Relative radius
    pointer: {
      length: 0.6, // // Relative to gauge radius
      strokeWidth: 0.035, // The thickness
      color: "#000000", // Fill color
    },
    limitMax: false, // If false, max value increases automatically if value > maxValue
    limitMin: false, // If true, the min value of the gauge will be fixed
    colorStart: warnatds, // Colors
    colorStop: warnatds, // just experiment with them
    strokeColor: "#E0E0E0", // to see which ones work best for you
    generateGradient: true,
    highDpiSupport: true, // High resolution support
  };
  var targettds = document.getElementById("footds"); // your canvas element
  var gaugetds = new Gauge(targettds).setOptions(optstds); // create sexy gauge!

  document.getElementById("tds-textfield").className = "tds-textfield";
  gaugetds.setTextField(document.getElementById("tds-textfield"));
  gaugetds.maxValue = 1000; // set max gaugetds value
  gaugetds.setMinValue(0); // Prefer setter over gaugetds.minValue = 0
  gaugetds.animationSpeed = 32; // set animation speed (32 is default value)
  gaugetds.set(tdsVal); // set actual value
});

dataKekeruhan.on("value", function (getdata1) {
  const kekeruhanVal = getdata1.val();

  document.getElementById("hasilpengukuranntu").innerHTML = kekeruhanVal;

  var statuskekeruhan = "";

  if (kekeruhanVal >= 0 && kekeruhanVal <= 25) {
    statuskekeruhan = "baik";
  } else {
    statuskekeruhan = "tidak baik";
  }

  document.getElementById("statusntu").innerHTML = statuskekeruhan;

  var warnantu = "#fdb62c";

  var optsntu = {
    angle: 0, // The span of the gauge arc
    lineWidth: 0.44, // The line thickness
    radiusScale: 1, // Relative radius
    pointer: {
      length: 0.6, // // Relative to gauge radius
      strokeWidth: 0.035, // The thickness
      color: "#000000", // Fill color
    },
    limitMax: false, // If false, max value increases automatically if value > maxValue
    limitMin: false, // If true, the min value of the gauge will be fixed
    colorStart: warnantu, // Colors
    colorStop: warnantu, // just experiment with them
    strokeColor: "#E0E0E0", // to see which ones work best for you
    generateGradient: true,
    highDpiSupport: true, // High resolution support
  };
  var targetntu = document.getElementById("foontu"); // your canvas element
  var gaugentu = new Gauge(targetntu).setOptions(optsntu); // create sexy gauge!

  document.getElementById("ntu-textfield").className = "ntu-textfield";
  gaugentu.setTextField(document.getElementById("ntu-textfield"));
  gaugentu.maxValue = 3000; // set max gaugentu value
  gaugentu.setMinValue(0); // Prefer setter over gaugentu.minValue = 0
  gaugentu.animationSpeed = 32; // set animation speed (32 is default value)
  gaugentu.set(kekeruhanVal); // set actual value
});
