const axios = require("axios");
const DatabaseClient = require("../config/mongodb");
const db = DatabaseClient.getClient();

var mode = "automatic"; //Automatic or Manual or Schedule
var soil_moisture = 0; // cần lấy giá trị mới nhất trong database
var min_moisture = 40;
var max_moisture = 60;
var pump = 0;
var intervalId = null;
var period = {
  start: new Date().toLocaleTimeString(),
  end: new Date().toLocaleTimeString(),
};

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
  period.start = new Date(start).toLocaleTimeString();
  period.end = new Date(end).toLocaleTimeString();
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    if (mode == "schedule") {
      var now = new Date().toLocaleTimeString();
      if (pump == 0 && intime(period.start, period.end, now)) {
        act_pump();
      } else if (pump == 1 && !intime(period.start, period.end, now)) {
        inact_pump();
      }
    } else {
      clearInterval(intervalId);
    }
  }, 1000);
}

function intime(start, end, now) {
  var top = new Date(new Date().toISOString().slice(0, 10) + " " + start);
  var down = new Date(new Date().toISOString().slice(0, 10) + " " + end);
  var innow = new Date(new Date().toISOString().slice(0, 10) + " " + now);
  if (top <= innow && innow <= down) return 1;
  return 0;
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

async function getScheduleTask(){
  const results = await db.collection("Task").find({}).toArray();
  return results
}

async function createTask(task){
  task["_id"] = String(Date.now());
  await db.collection("Task").insertOne(task);
}

async function updateTask(taskId, updatedValue) {
  try {
    const updatedTask = await db.collection("Task").findOneAndUpdate(
      { _id: taskId},
      { $set: updatedValue },
      { new: true }
    );
    console.log(updatedTask);
    if (!updatedTask) {
      throw new Error("Task not found");
    }
    return updatedTask;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
}
  
async function deleteTask(taskId){
  await db.collection("Task").findOneAndDelete({_id: taskId});
}

async function deleteAllTasks(){
  await db.collection("Task").deleteMany({});
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
  getScheduleTask,
  createTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
};
