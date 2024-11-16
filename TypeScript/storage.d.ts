export interface IFile {
  found: boolean;
  ext: string;
  stream: NodeJS.ReadableStream;
}

export interface IStorage {
  constructor(folder: string);
  prepare(filename): Promise<IFile>;
}

export class Storage implements IStorage {
  constructor(folder: string);
  prepare(filename): Promise<IFile>;
}
