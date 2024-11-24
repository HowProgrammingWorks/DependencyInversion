'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { Console } = require('node:console');
const { PassThrough } = require('node:stream');

/** @type {(filename: string) => Console} */
const createLogger = (filename) => {
  const filePath = path.join(process.cwd(), filename);
  const fileStream = fs.createWriteStream(filePath);
  const passThrough = new PassThrough();
  passThrough.pipe(fileStream);
  passThrough.pipe(process.stdout);
  const logger = new Console({ stdout: passThrough });
  return logger;
};

module.exports = { createLogger };
