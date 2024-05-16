const express = require('express');
const router = express.Router();
const diseaseDetection = require('../controllers/diseaseDetection');

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = './AI-Model/diseaseDetection/picture';
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  // Initialize upload variable
  const upload = multer({ storage: storage });

router.get('/', upload.single('image'), diseaseDetection.getDisease);

module.exports = router;