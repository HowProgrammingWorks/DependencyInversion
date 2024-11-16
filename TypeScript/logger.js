'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { Console } = require('node:console');

const createLogger = (filename) => {
  const filePath = path.join(process.cwd(), filename);
  const fileStream = fs.createWriteStream(filePath);
  const logger = new Console({ stdout: fileStream });
  return logger;
};

module.exports = { createLogger };
