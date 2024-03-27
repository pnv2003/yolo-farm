const { get_humi, act_pump, inact_pump } = require("../models/watering");

let status = "auto"

while(status = "auto"){
    if(get_humi()<60) act_pump();
    if(get_humi()>70) inact_pump();
}