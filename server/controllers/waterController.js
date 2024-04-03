const water_model = require("../models/watering");

async function getMoisture(req, res) {
  value = await water_model.getMoisture();
  res.json(value);
}

async function setMoisture(req, res) {
  try {
    await water_model.setMoisture(req.body.moisture);
    checkMoisture = await water_model.checkMoisture(req.body.moisture);
    res.send("Successful");
  } catch (err) {
    throw err;
  }
}

async function getMode(req, res) {
  value = await water_model.getMode();
  res.json(value);
}

async function setMode(req, res) {
  await water_model.setMode(req.query.mode);
  res.send("Successful");
}

async function getMinMoisture(req, res) {
  value = await water_model.get_min_moisture();
  res.json(value);
}

async function setMinMoisture(req, res) {
  await water_model.set_min_moisture(req.query.minMoisture);
  res.send("Successful");
}

async function getMaxMoisture(req, res) {
  value = await water_model.get_max_moisture();
  res.json(value);
}

async function setMaxMoisture(req, res) {
  await water_model.set_max_moisture(req.query.maxMoisture);
  res.send("Successful");
}

module.exports = {
  getMoisture,
  setMoisture,
  getMode,
  setMode,
  getMinMoisture,
  setMinMoisture,
  getMaxMoisture,
  setMaxMoisture
};
