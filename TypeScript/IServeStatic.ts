import { IStorage } from "./IStorage";

export interface IServeStatic {
  (storage: IStorage, logger: Console, port: number): void;
}
