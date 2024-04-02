const axios = require("axios");

var mode = "Automatic"; //Automatic or Manual
var soil_moisture = 0; // cần lấy giá trị mới nhất trong database
var min_moisture = 40; // lấy từ database
var max_moisture = 60; // lấy từ database

async function getMoisture() {
  return { soilMoisture: soil_moisture };
}

async function setMoisture(value) {
  soil_moisture = value;
}

async function getMode() {
  return { Mode: mode };
}

async function setMode(value) {
  mode = value;
}

async function checkMoisture(value) {
  if (value < min_moisture) {
    if (mode == "Automatic") {
      await act_pump();
    } else {
      console.log("Warning: Soil Moisture is low");
    }
  } else if (value > max_moisture) {
    if (mode == "Automatic") {
      await inact_pump();
    } else {
      console.log("Warning: Soil Moisture is high");
    }
  }
  return "Successful"
}

async function act_pump() {
  axios.post("http://localhost:8081/gatewayAppApi/pumb", {
    pumb: 1,
  });
}

async function inact_pump() {
  axios.post("http://localhost:8081/gatewayAppApi/pumb", {
    pumb: 0,
  });
}

module.exports = {
  getMoisture,
  setMoisture,
  getMode,
  setMode,
  checkMoisture
};
