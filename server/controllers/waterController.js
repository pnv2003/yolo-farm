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
  await water_model.setMode(req.body.mode);
  res.send("Successful");
}

async function getMinMaxMoisture(req, res) {
  value = await water_model.get_minmax_moisture();
  res.json(value);
}

async function setMinMaxMoisture(req, res) {
  await water_model.set_minmax_moisture(req.body.minMoisture,req.body.maxMoisture);
  res.send("Successful");
}

module.exports = {
  getMoisture,
  setMoisture,
  getMode,
  setMode,
  getMinMaxMoisture,
  setMinMaxMoisture
};
