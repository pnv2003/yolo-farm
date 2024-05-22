const lightModel = require("../models/light");

async function getLightEnergy(req, res, err) {
  try {
    const value = await lightModel.getLightEnergy();
    res.json(value);
  } catch (error) {
    console.error("Error in getLightEnergy:", error);
  }
}

async function setLightEnergy(req, res, err) {
  try {
    const lightEnergy = req.body.LightEnergy;
    await lightModel.setLightEnergy(lightEnergy);
    const checkLightEnergy = await lightModel.checkLightEnergy(lightEnergy);
    if (!checkLightEnergy) {
      res.json({status: "error"});
    }
  } catch (error) {
    console.error("Error in setLightEnergy:", error);
  }
}

async function getMinMaxLightEnergy(req, res) {
  try {
    const value = await lightModel.getMinMaxLightEnergy();
    res.json(value);
  } catch (error) {
    console.error("Error in getMinMaxLightEnergy:", error);
  }
}

async function setMinMaxLightEnergy(req, res) {
  try {
    const { minLightEnergy, maxLightEnergy } = req.body;
    await lightModel.setMinMaxLightEnergy(minLightEnergy, maxLightEnergy);
    // res.status(200).send("Successful");
  } catch (error) {
    console.error("Error in setMinMaxLightEnergy:", error);
    
  }
}

module.exports = {
  getLightEnergy,
  setLightEnergy,
  getMinMaxLightEnergy,
  setMinMaxLightEnergy,
};