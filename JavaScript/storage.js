'use strict';

const fs = require('node:fs');
const path = require('node:path');

const toBool = [() => true, () => false];

class PreparedFile {
  constructor(found, ext, stream) {
    this.found = found;
    this.ext = ext;
    this.stream = stream;
  }
}

class Storage {
  #folder = '';

  constructor(folder) {
    this.#folder = path.join(process.cwd(), folder);
  }

  async prepare(filename) {
    const paths = [this.#folder, filename];
    if (filename.endsWith('/')) paths.push('index.html');
    const filePath = path.join(...paths);
    const pathTraversal = !filePath.startsWith(this.#folder);
    const exists = await fs.promises.access(filePath).then(...toBool);
    const found = !pathTraversal && exists;
    const streamPath = found ? filePath : this.#folder + '/404.html';
    const ext = path.extname(streamPath).substring(1).toLowerCase();
    const stream = fs.createReadStream(streamPath);
    return new PreparedFile(found, ext, stream);
  }
}

module.exports = { Storage };
