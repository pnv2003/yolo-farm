const { model } = require("mongoose");
const detection = require("../models/leaf-disease-detection");

async function getDisease(req, res) {
  try {
    const result = await detection.getResult();
    res.json({ "disease": result });
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

module.exports = {
    getDisease
};