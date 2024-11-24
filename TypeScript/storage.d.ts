import { IFile } from "./IFile";
import { IStorage } from "./IStorage";

export class Storage implements IStorage {
  constructor(folder: string);
  prepare(filename: string): Promise<IFile>;
}
