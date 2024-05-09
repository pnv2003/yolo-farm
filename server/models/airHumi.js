const axios = require("axios");

var mode = "automatic"; //Automatic or Manual
var airHumi = 0; // cần lấy giá trị mới nhất trong database
var min_humi = 45;
var max_humi = 60;
var fan = 0; // cần lấy giá trị mới nhất trong database

async function getHumi() {
  return { humi: airHumi };
}

async function setHumi(value) {
  airHumi = value;
}

async function get_minmax_humi() {
  return { minHumi: min_humi, maxHumi: max_humi };
}

async function set_minmax_humi(value1, value2) {
  min_humi = value1;
  max_humi = value2;
}

async function getMode() {
  return { mode: mode };
}

async function setMode(value) {
  mode = value;
}

async function checkHumi(value) {
  if (value < min_humi) {
    if ((fan == 1 && mode == "automatic")) {
    //   await inact_fan();
    } else if (mode != "automatic") {
      console.log("Warning: Air Humidity is low");
    }
  } else if (value > max_humi) {
    if ((fan == 0 && mode == "automatic")) {
    //   await act_fan();
    } else if (mode != "automatic") {
      console.log("Warning: Air Humidity is high");
    }
  }
  return "Successful";
}

// async function act_fan() {
//   axios.put("http://localhost:8081/gatewayAppApi/fan", {
//     fan: 1,
//   });
//   fan = 1;
// }

// async function inact_fan() {
//   axios.put("http://localhost:8081/gatewayAppApi/fan", {
//     fan: 0,
//   });
//   fan = 0;
// }

module.exports = {
  getHumi,
  setHumi,
  getMode,
  setMode,
  get_minmax_humi,
  set_minmax_humi,
  checkHumi
};
