import { IFile } from "./IFile";

export interface IStorage {
  prepare(filename: string): Promise<IFile>;
}
