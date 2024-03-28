const { get_humi, act_pump, inact_pump } = require("../models/watering");

let status = "auto";

get_humi((valueLoad) => {
  console.log("Soil Moisture:", valueLoad);
  if (valueLoad < 60) act_pump();
  if (valueLoad > 80) inact_pump();
});

function changeMode(req, res, next){
    try{
        status=req.body.mode;
        console.log(status);
        res.json("complete");
    }
    catch(err){
        next(err);
    }
}

module.exports = {
    changeMode
}