const water_model = require("../models/watering");

async function getMoisture(req, res) {
  value = await water_model.getMoisture();
  res.json(value);
}

async function setMoisture(req, res) {
  try {
    await water_model.setMoisture(req.body.moisture);
    checkMoisture = await water_model.checkMoisture(req.body.moisture);
    res.json({ "status": "OK" });
  } catch (err) {
    throw err;
  }
}

async function getMode(req, res) {
  value = await water_model.getMode();
  res.json(value);
}

async function setMode(req, res) {
  await water_model.setMode(req.body.mode);
  if (req.body.mode == "schedule")
    water_model.schedule_mode(req.body.start, req.body.end);
  res.json({ "status": "OK" });
}

async function getMinMaxMoisture(req, res) {
  value = await water_model.get_minmax_moisture();
  res.json(value);
}

async function setMinMaxMoisture(req, res) {
  await water_model.set_minmax_moisture(
    req.body.minMoisture,
    req.body.maxMoisture
  );
  res.json({ "status": "OK" });
}

async function getScheduleTask(req, res) {
  try {
    const tasks = await water_model.getScheduleTask();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createTask(req, res) {
  try {
    const task = req.body;
    const createdTask = await water_model.createTask(task);
    res.status(201).json(createdTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateTask(req, res) {
  try {
    const _id = req.params.id;
    const updatedValue = req.body;
    const updatedTask = await water_model.updateTask(_id, updatedValue);
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteTask(req, res) {
  try {
    const taskId = req.params.id;
    await water_model.deleteTask(taskId);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteAllTasks(req, res) {
  try {
    await water_model.deleteAllTasks();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json("Internet Server Error");
  }
}

module.exports = {
  getMoisture,
  setMoisture,
  getMode,
  setMode,
  getMinMaxMoisture,
  setMinMaxMoisture,
  getScheduleTask,
  createTask,
  updateTask,
  deleteTask,
  deleteAllTasks
};
