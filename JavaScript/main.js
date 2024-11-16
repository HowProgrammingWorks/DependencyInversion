'use strict';

const { serveStatic } = require('./server.js');
const { logger } = require('./logger.js');

const PORT = 8000;

serveStatic('./static', PORT);
logger.log(`Server running at http://127.0.0.1:${PORT}/`);
