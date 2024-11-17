export interface IServeStatic {
  (storage: IStorage, logger: Console, port: number);
}

export const serveStatic: IServeStatic;
