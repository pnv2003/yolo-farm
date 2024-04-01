require("dotenv").config();
const { MongoClient} = require("mongodb");

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://phuctran2703:RSqZV9ufQ1pBaxwW@cluster0.krbalrf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// connect MongoDB
const client = new MongoClient(MONGODB_URI);

// connect database
var database;
try {
  client.connect();
  console.log("Connected to MongoDB");
  database = client.db("DADN-AI");
  console.log("Connected to Database DADN-AI");
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
}

module.exports = database;
