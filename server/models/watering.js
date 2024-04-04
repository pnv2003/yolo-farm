const axios = require("axios");

var mode = "automatic"; //Automatic or Manual or Schedule
var soil_moisture = 0; // cần lấy giá trị mới nhất trong database
var min_moisture = 40;
var max_moisture = 60;
var period = {
  start: new Date().toLocaleTimeString(),
  end: new Date("2024-04-04T15:19:00").toLocaleTimeString(),
};
var pump = 0;

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

async function schedule_mode(start, end) {
  period.start = start;
  period.end = end;
  var intervalId = setInterval(() => {
    if (mode == "schedule") {
      const now = new Date().toLocaleTimeString();
      if (pump == 0 && period.start <= now && now <= period.end) {
        act_pump();
      } else if (pump == 1 && (period.start > now || now > period.end)) {
        inact_pump();
      }
    } else {
      clearInterval(intervalId);
    }
  }, 1000);
}

async function checkMoisture(value) {
  if (value < min_moisture) {
    if ((pump = 0 && mode == "automatic")) {
      await act_pump();
    } else if (mode != "automatic") {
      console.log("Warning: Soil Moisture is low");
    }
  } else if (value > max_moisture) {
    if ((pump = 1 && mode == "automatic")) {
      await inact_pump();
    } else if (mode != "automatic") {
      console.log("Warning: Soil Moisture is high");
    }
  }
  return "Successful";
}

async function act_pump() {
  axios.put("http://localhost:8081/gatewayAppApi/pumb", {
    pumb: 1,
  });
  pump = 1;
}

async function inact_pump() {
  axios.put("http://localhost:8081/gatewayAppApi/pumb", {
    pumb: 0,
  });
  pump = 0;
}

module.exports = {
  getMoisture,
  setMoisture,
  getMode,
  setMode,
  get_minmax_moisture,
  set_minmax_moisture,
  checkMoisture,
  schedule_mode,
};
