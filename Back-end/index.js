const express = require('express');

const app = express();
const config = require('./configs/app');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

// Express Configs
require('./configs/express')(app);

// Middleware
require('./configs/middleware');

// Routes
app.use(require('./routes'));

// Error handler
require('./configs/errorHandler')(config.isProduction, app);

// Start Server

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  // Workers can share any TCP connection
  const server = app.listen(config.port, () => {
    const host = server.address().address;
    const { port } = server.address();
    // console.log(`Server is running PID ${process.pid}`)
    console.log(`Server is running at http://${host}:${port}`);
    console.log(`Worker ${process.pid} started`);
  });
}
