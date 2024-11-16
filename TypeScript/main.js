'use strict';

const { serveStatic } = require('./server.js');
const { Storage } = require('./storage.js');
const { createLogger } = require('./logger.js');

const PORT = 8000;

const storage = new Storage('./static');
const logger = createLogger('./access.log');
serveStatic(storage, logger, PORT);

logger.log(`Server running at http://127.0.0.1:${PORT}/`);
