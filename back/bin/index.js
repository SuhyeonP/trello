#!/usr/bin/env node

import http from 'http';
import app from '../app.js';
import getDatabase from '../model/index.js';

(async () => {
  const server = http.createServer(app);

  const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
      return val;
    }

    if (port >= 0) {
      return port;
    }

    return false;
  };

  const onError = error => {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  };

  const onListening = () => {
    const addr = server.address();
    const bind =
      typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
  };

  const port = normalizePort(process.env.PORT || '3064');
  app.set('port', port);

  const models = await getDatabase();
  app.set('db', models);

  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
})();
