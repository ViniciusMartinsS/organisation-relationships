import "reflect-metadata";
import { readFileSync } from 'fs'
import { createConnection } from "typeorm";
import { Organisation } from "./entity";

const FILE_PATH = `${__dirname}/../../../../ormconfig.json`

class Database {
  private configuration: any

  constructor() {
    const configurationFile = readFileSync(FILE_PATH, 'utf-8')

    const { migrations, subscribers, ...configuration }
      = JSON.parse(configurationFile)

    this.configuration =
      { ...configuration, entities: [ Organisation ] }
  }

  async initialize() {
    try {
      return createConnection(this.configuration)
    } catch (error) {
      console.log(error)
    }
  }
}

export default Database
