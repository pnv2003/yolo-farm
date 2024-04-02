require("dotenv").config();
const mongoose = require('mongoose');

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://phuchuynh0904:09042003@cluster0.krbalrf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10
});

mongoose.Promise = global.Promise;

// Get the default connection
const db = mongoose.connection;

// Event listeners for connection
db.once('open', () => {
  console.log('Connected to MongoDB');
});

db.on('error', error => {
  console.error('Error in MongoDB connection:', error);
});

db.on('disconnected', () => {
  console.log('MongoDB disconnected, attempting to reconnect (if needed)');
  // mongoose.connect(MONGODB_URI, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   maxPoolSize: 10
  // });
});

module.exports = db;