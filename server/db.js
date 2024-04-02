const DatabaseClient = require("./config/mongodb");
const db = DatabaseClient.getClient();

async function setupDatabase() {
  try {
    await db.collection("Environment").drop();
    await db.collection("Species").drop();
    await db.collection("Plants").drop();
    await db.collection("Devices").drop();
    await db.collection("LightingCondition").drop();
    await db.collection("TemperatureCondition").drop();
    await db.collection("SoilMoisture").drop();
    await db.collection("AirHumidity").drop();

    // Create collections
    await db.createCollection("Environment");
    await db.createCollection("Species");
    await db.createCollection("Plants");
    await db.createCollection("Devices");
    await db.createCollection("LightingCondition");
    await db.createCollection("TemperatureCondition");
    await db.createCollection("SoilMoisture");
    await db.createCollection("AirHumidity");

    // Insert documents
    await db.collection("Environment").insertOne({ _id: 1 });
    await db.collection("Species").insertOne({
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

    await db.collection("Plants").insertMany([
      {
        _id: 1,
        Age: 1,
        idSpecial: 1,
        idEnvironment: 1,
      },
      {
        _id: 2,
        Age: 1,
        idSpecial: 1,
        idEnvironment: 1,
      },
    ]);

    await db.collection("Devices").insertMany([
      {
        _id: 1,
        Type: "Measure temperature",
        idEnvironment: 1,
      },
      {
        _id: 2,
        Type: "Measure soil moisture",
        idEnvironment: 1,
      },
      {
        _id: 3,
        Type: "Measure light",
        idEnvironment: 1,
      },
      {
        _id: 4,
        Type: "Measure air humidity",
        idEnvironment: 1,
      }
    ]);

    console.log("Completely created data");

    disconnect();

  } catch (error) {
    console.error("Error setting up database:", error);
  }
}

setupDatabase();