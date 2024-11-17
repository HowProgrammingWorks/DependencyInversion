export interface ICreateLogger {
  (filename: string): Console;
}

export const createLogger: ICreateLogger;
