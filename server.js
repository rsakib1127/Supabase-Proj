require('dotenv').config(); // Load environment variables from .env file
const cluster = require('cluster');
const os = require('os');
const app = require('./app'); // Import the main Express app configuration
const connectDB = require('./db/mongodb'); // Import database connection function
// const initializeCollections = require('./modules/DBCollectionSetup/initializeCollections')
const PORT = process.env.PORT || 3000;
const numCPUs = os.cpus().length; // Number of CPU cores

// Define the main function to start the server
async function main() {
  try {
    // await connectDB(); // Connect to MongoDB
    // await initializeCollections();
    // console.log(`Worker ${process.pid} connected to MongoDB`);
    // Start the Express app on the specified port
    app.listen(PORT, () => {
      // console.log(`Worker ${process.pid} is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1); // Exit on failure to connect to the database
  }
}

// // Check if the current process is the master
// if (cluster.isMaster) {
// //   console.log(`Master ${process.pid} is running`);

//   // // Fork workers based on CPU cores
//   // for (let i = 0; i < numCPUs; i++) {
//   //   cluster.fork();
//   // }

//   // // Replace workers that exit
//   // cluster.on('exit', (worker, code, signal) => {
//   //   // console.log(`Worker ${worker.process.pid} died. Forking a new worker...`);
//   //   cluster.fork();
//   // });

// } else {
  // Each worker will call the main function to start the server
  main();

  // Graceful shutdown for unexpected errors
  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
  });

  process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error);
    process.exit(1);
  });
// }