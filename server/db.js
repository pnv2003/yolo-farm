const db = require("./config/mongodb");

db.collection("Environment").drop();
db.collection("Species").drop();
db.collection("Plants").drop();
db.collection("Devices").drop();
db.collection("LightingCondition").drop();
db.collection("TemperatureCondition").drop();
db.collection("SoilMoisture").drop();
db.collection("AirHumidity").drop();

db.createCollection("Enviroment");
db.createCollection("Species");
db.createCollection("Plants");
db.createCollection("Devices");
db.createCollection("Lighting Condition");
db.createCollection("Temperature Condition");
db.createCollection("Soil Moisture");
db.createCollection("Air Humidity");

db.collection("Enviroment").insertOne({ _id: 1 }, { _id: 2 });

db.collection("Species").insertOne({
  _id: 1,
  Name: "Tomato",
  MinLight: 2000,
  MaxLight: 3000,
  MinTemp: 21,
  MaxTemp: 24,
  MinSoilMoi: 60,
  MaxSoilMoi: 70,
  MinHumi: 45,
  MaxHumi: 55,
});

db.collection("Plant").insertMany([
  {
    _id: 1,
    Age: 1,
    idSpecial: 1,
    idEnviroment: 1,
  },
  {
    _id: 2,
    Age: 1,
    idSpecial: 1,
    idEnviroment: 1,
  },
]);

db.collection("Devices").insertMany([
  {
    _id: 1,
    Type: "Measure temperature",
    idEnviroment: 1,
  },
  {
    _id: 2,
    Type: "Measure soil moisture",
    idEnviroment: 1,
  },
  {
    _id: 3,
    Type: "Measure light",
    idEnviroment: 1,
  },
  {
    _id: 4,
    Type: "Measure air humidity",
    idEnviroment: 1,
  }
]);

console.log("Completely create data ");
