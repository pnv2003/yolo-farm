var spawn = require("child_process").spawn;

function getResult() {
    return new Promise((resolve, reject) => {
      const process = spawn("python", ["AI-Model/diseaseDetection/main.py"]);
  
      let result = "";
  
      process.stdout.on("data", function (data) {
        result += data.toString();
      });
  
      process.on("close", function (code) {
        if (code !== 0) {
          reject(new Error(`Process exited with code ${code}`));
          return;
        }
        resolve(result);
      });
    });
  }
  

module.exports = {
  getResult,
};
