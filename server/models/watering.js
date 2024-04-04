const axios = require("axios");

var mode = "automatic"; //Automatic or Manual
var soil_moisture = 0; // cần lấy giá trị mới nhất trong database
var min_moisture = 40;
var max_moisture = 60;

async function getMoisture() {
  return { soilMoisture: soil_moisture };
}

async function setMoisture(value) {
  soil_moisture = value;
}

async function getMode() {
  return { mode: mode };
}

async function setMode(value) {
  mode = value;
}

async function get_minmax_moisture() {
  return { minMoisture: min_moisture, maxMoisture: max_moisture };
}

async function set_minmax_moisture(value1, value2) {
  min_moisture = value1;
  max_moisture = value2;
}

async function checkMoisture(value) {
  if (value < min_moisture) {
    if (mode == "automatic") {
      await act_pump();
    } else {
      console.log("Warning: Soil Moisture is low");
    }
  } else if (value > max_moisture) {
    if (mode == "automatic") {
      await inact_pump();
    } else {
      console.log("Warning: Soil Moisture is high");
    }
  }
  return "Successful";
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
  get_minmax_moisture,
  set_minmax_moisture,
  checkMoisture,
};
