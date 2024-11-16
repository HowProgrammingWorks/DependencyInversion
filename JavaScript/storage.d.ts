export class File {
  found: boolean;
  ext: string;
  stream: NodeJS.ReadableStream;
  constructor(found: boolean, ext: string, stream: NodeJS.ReadableStream);
}

export class Storage {
  constructor(folder: string);
  prepare(filename: string): Promise<PreparedFile>;
}
