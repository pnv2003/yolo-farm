const { get_humi, act_pump, inact_pump } = require("../models/watering");

let status = "auto";

if (status == "auto") {
  get_humi((valueLoad) => {
    console.log("Soil Moisture:", valueLoad);
    if (valueLoad < 60) act_pump();
    if (valueLoad > 80) inact_pump();
  });
}

function changeMode(req, res, next){
    try{
        mode=req.body.mode;
        res.json("complete");
    }
    catch(err){
        next(err);
    }
}

module.exports = {
    changeMode
}