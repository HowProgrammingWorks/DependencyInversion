'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { Console } = require('node:console');

const filePath = path.join(process.cwd(), './access.log');
const fileStream = fs.createWriteStream(filePath);
const logger = new Console({ stdout: fileStream });

module.exports = { logger };
