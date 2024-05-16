const { model } = require("mongoose");
const detection = require("../models/leaf-disease-detection");
const multer = require("multer");

async function getDisease(req, res) {
  try {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "../AI-Model/diseaseDetection/picture/1.png");

    if (path.extname(req.file.originalname).toLowerCase() === ".jpg") {
      fs.rename(tempPath, targetPath, err => {
        res
          .status(200)
          .contentType("text/plain")
          .end("File uploaded!");
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);
        res
          .status(403)
          .contentType("text/plain")
          .end("Only .png files are allowed!");
      });
    }


    const result = await detection.getResult();
    res.json({ "disease": result });
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

module.exports = {
    getDisease
};