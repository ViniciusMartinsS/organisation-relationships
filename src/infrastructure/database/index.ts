import { readFileSync } from 'fs';
import { createConnection, Connection } from 'mysql2/promise';

const FILE_PATH = `${__dirname}/../../../../ormconfig.json`;
class Database {
  private configuration: any;

  public constructor() {
    const configurationFile = readFileSync(FILE_PATH, 'utf-8');

    const { host, username: user, password, database }
      = JSON.parse(configurationFile);

    this.configuration = { host, user, password, database };
  }

  public async initialize(): Promise<Connection> {
    return createConnection(this.configuration);
  }
}

export default Database;
