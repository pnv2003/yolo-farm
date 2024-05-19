let multer = require("multer");
const express = require("express");
const router = express.Router();

const diseaseDetection = require("../controllers/diseaseDetection");

// create configuration to store file upload
let diskStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./AI-Model/diseaseDetection/picture");
  },
  filename: (req, file, callback) => {
    // only allowed png & jpg
    let math = ["image/png", "image/jpeg"];
    if (math.indexOf(file.mimetype) === -1) {
      let errorMess = `The file <strong>${file.originalname}</strong> is invalid. Only allowed to upload image jpeg or png.`;
      return callback(errorMess, null);
    }
    // rename file
    let filename = `1.jpg`;
    callback(null, filename);
  },
});

// create middleware uploadFile,
// "file" is name input
let uploadFile = multer({ storage: diskStorage }).single("file");

// Handle upload file
router.post("/", (req, res, next) => {
  uploadFile(req, res, (error) => {
    if (error) {
      console.error(`Error when trying to upload: ${error}`);
      return res.status(500).send(`Error when trying to upload: ${error.message}`);
    }

    console.log(`------Request body-----`);
    console.log(req.body);

    console.log(`------Request file-----`);
    console.log(req.file);

    console.log(`------Test Done-----`);
    next();
  });
}, diseaseDetection.getDisease);


module.exports = router;
