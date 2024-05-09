const temp_model = require("../models/temperature");

async function getTemp(req, res) {
  value = await temp_model.getTemp();
  res.json(value);
}

async function setTemp(req, res) {
  try {
    await temp_model.setTemp(req.body.temp);
    checktemp = await temp_model.checkTemp(req.body.temp);
    res.send("Successful");
  } catch (err) {
    throw err;
  }
}

async function getMinMaxTemp(req, res) {
  value = await temp_model.get_minmax_temp();
  res.json(value);
}

async function setMinMaxTemp(req, res) {
  await temp_model.set_minmax_temp(
    req.body.minTemp,
    req.body.maxTemp
  );
  res.send("Successful");
}

async function getMode(req, res) {
  value = await temp_model.getMode();
  res.json(value);
}

async function setMode(req, res) {
  await temp_model.setMode(req.body.mode);
  res.send("Successful");
}

module.exports = {
  getTemp,
  setTemp,
  getMinMaxTemp,
  setMinMaxTemp,
  getMode,
  setMode
};
