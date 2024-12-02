const { MongoClient } = require('mongodb');

let db;

async function connectDB() {
  if (db) return db; // Return existing connection if it exists

  const client = new MongoClient(process.env.MONGO_URI); // No need for useNewUrlParser or useUnifiedTopology

  try {
    await client.connect(); // Connect to MongoDB
    db = client.db(process.env.DB_NAME); // Set the specific database name
    // console.log('Successfully connected to MongoDB');
    return db;
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1); // Exit with failure if connection fails
  }
}

module.exports = connectDB;