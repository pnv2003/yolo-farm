const axios = require("axios");

var mode = "automatic"; //Automatic or Manual
var temp = 0; // cần lấy giá trị mới nhất trong database
var min_temp = 21;
var max_temp = 27;
var fan = 0; // cần lấy giá trị mới nhất trong database

async function getTemp() {
  return { temp: temp };
}

async function setTemp(value) {
  temp = value;
}

async function get_minmax_temp() {
  return { minTemp: min_temp, maxTemp: max_temp };
}

async function set_minmax_temp(value1, value2) {
  min_temp = value1;
  max_temp = value2;
}

async function getMode() {
  return { mode: mode };
}

async function setMode(value) {
  mode = value;
}

async function checkTemp(value) {
  if (value < min_temp) {
    if ((fan == 1 && mode == "automatic")) {
      await inact_fan();
    } else if (mode != "automatic") {
      console.log("Warning: Temperature is low");
    }
  } else if (value > max_temp) {
    if ((fan == 0 && mode == "automatic")) {
      await act_fan();
    } else if (mode != "automatic") {
      console.log("Warning: Temperature is high");
    }
  }
  return "Successful";
}

async function act_fan() {
  axios.put("http://localhost:8081/gatewayAppApi/fan", {
    fan: 1,
  });
  fan = 1;
}

async function inact_fan() {
  axios.put("http://localhost:8081/gatewayAppApi/fan", {
    fan: 0,
  });
  fan = 0;
}

module.exports = {
  getTemp,
  setTemp,
  getMode,
  setMode,
  get_minmax_temp,
  set_minmax_temp,
  checkTemp
};
