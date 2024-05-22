const humi_model = require("../models/airHumi");

async function getHumi(req, res) {
  value = await humi_model.getHumi();
  res.json(value);
}

async function setHumi(req, res) {
  try {
    await humi_model.setHumi(req.body.humi);
    checkHumi = await humi_model.checkHumi(req.body.humi);
    res.json({ "status": "OK" });
  } catch (err) {
    throw err;
  }
}

async function getMinMaxHumi(req, res) {
  value = await humi_model.get_minmax_humi();
  res.json(value);
}

async function setMinMaxHumi(req, res) {
  await humi_model.set_minmax_humi(
    req.body.minHumi,
    req.body.maxHumi
  );
  res.json({ "status": "OK" });
}

async function getMode(req, res) {
  value = await humi_model.getMode();
  res.json(value);
}

async function setMode(req, res) {
  await humi_model.setMode(req.body.mode);
  res.json({ "status": "OK" });
}

module.exports = {
  getHumi,
  setHumi,
  getMinMaxHumi,
  setMinMaxHumi,
  getMode,
  setMode
};
