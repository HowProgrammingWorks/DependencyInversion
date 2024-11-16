'use strict';

const { createServer } = require('node:http');
const { Storage } = require('./storage.js');
const { logger } = require('./logger.js');

const MIME_TYPES = {
  default: 'application/octet-stream',
  html: 'text/html; charset=UTF-8',
  js: 'application/javascript; charset=UTF-8',
  json: 'application/json',
  css: 'text/css',
  png: 'image/png',
  jpg: 'image/jpg',
  gif: 'image/gif',
  ico: 'image/x-icon',
  svg: 'image/svg+xml',
  txt: 'text/plain',
};

const serveStatic = (folder, port) => {
  const storage = new Storage(folder);
  const server = createServer(async (req, res) => {
    const file = await storage.prepare(req.url);
    const statusCode = file.found ? 200 : 404;
    const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;
    res.writeHead(statusCode, { 'Content-Type': mimeType });
    file.stream.pipe(res);
    logger.log(`${req.method} ${req.url} ${statusCode}`);
  });
  server.listen(port);
};

module.exports = { serveStatic };
