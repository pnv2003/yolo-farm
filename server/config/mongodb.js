require("dotenv").config();
const { MongoClient} = require("mongodb");

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://phuchuynh0904:09042003@cluster0.krbalrf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// connect MongoDB
const client = new MongoClient(MONGODB_URI, {
  maxPoolSize: 10
});

let database;

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    database = client.db("YOLO Farm");
    console.log("Connected to Database DADN-AI");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToDatabase();

module.exports = database;
