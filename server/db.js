const DatabaseClient = require("./config/mongodb");
const db = DatabaseClient.getClient();

async function setupDatabase() {
  try {
    await db.collection("Environment").drop();
    await db.collection("Species").drop();
    await db.collection("Plants").drop();
    await db.collection("Devices").drop();
    await db.collection("Lighting Condition").drop();
    await db.collection("Temperature Condition").drop();
    await db.collection("Soil Moisture").drop();
    await db.collection("Air Humidity").drop();

    // Create collections
    await db.createCollection("Environment");
    await db.createCollection("Species");
    await db.createCollection("Plants");
    await db.createCollection("Devices");
    await db.createCollection("Lighting Condition");
    await db.createCollection("Temperature Condition");
    await db.createCollection("Soil Moisture");
    await db.createCollection("Air Humidity");

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