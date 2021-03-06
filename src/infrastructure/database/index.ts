import { readFileSync } from 'fs';
import { createConnection, Connection } from 'mysql2/promise';
import { DatabaseClass, DatabaseConfiguration } from '../infrastructure.interface';

const FILE_PATH = `${__dirname}/../../../../ormconfig.json`;
class Database implements DatabaseClass {
  private configuration: DatabaseConfiguration;

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
