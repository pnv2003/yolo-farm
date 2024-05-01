const lightModel = require("../models/light");

async function getLightEnergy(req, res) {
  try {
    const value = await lightModel.getLightEnergy();
    res.json(value);
  } catch (error) {
    console.error("Error in getLightEnergy:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function setLightEnergy(req, res) {
  try {
    const lightEnergy = req.body.LightEnergy;
    await lightModel.setLightEnergy(lightEnergy);
    const checkLightEnergy = await lightModel.checkLightEnergy(lightEnergy);
    if (!checkLightEnergy) {
      res.status(400).send("Light energy isn't in the specified range.");
    } else {
      res.status(200).send("Successful");
    }
  } catch (error) {
    console.error("Error in setLightEnergy:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function getMinMaxLightEnergy(req, res) {
  try {
    const value = await lightModel.getMinMaxLightEnergy();
    res.json(value);
  } catch (error) {
    console.error("Error in getMinMaxLightEnergy:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function setMinMaxLightEnergy(req, res) {
  try {
    const { minLightEnergy, maxLightEnergy } = req.body;
    await lightModel.setMinMaxLightEnergy(minLightEnergy, maxLightEnergy);
    res.status(200).send("Successful");
  } catch (error) {
    console.error("Error in setMinMaxLightEnergy:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  getLightEnergy,
  setLightEnergy,
  getMinMaxLightEnergy,
  setMinMaxLightEnergy,
};