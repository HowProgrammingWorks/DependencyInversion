'use strict';

const { createServer } = require('node:http');

/** @type {Record<string, string>} */
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

/** @type {(storage: import('./IStorage').IStorage, logger: Console, port: number) => void} */
const serveStatic = (storage, logger, port) => {

  /** @type {(res: import('node:http').ServerResponse) => void} */
  const notFound = (res) => {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('Not Found');
    res.end();
  }

  const server = createServer(async (req, res) => {
    if (!req.url) {
      logger.log(`${req.method} <not-provided> 404`);
      return notFound(res);
    }

    const file = await storage.prepare(req.url);
    
    if (!file.found) {
      logger.log(`${req.method} ${req.url} 404`);
      return notFound(res);
    }

    const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;
    res.writeHead(200, { 'Content-Type': mimeType });

    file.stream.pipe(res);
    logger.log(`${req.method} ${req.url} 200`);
  });

  server.listen(port);
};

module.exports = { serveStatic };
