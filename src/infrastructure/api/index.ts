import express from 'express'

import OrganisationHandl from '../../handler/organisation.handler'
import OrganisationUseCas from '../../usecase/organisation.usecase'
import SchemaValidator from './schema';
import Database from '../database';
import { Routes } from './routes';
import { Connection } from 'mysql2/promise';
import OrganisationRepository from '../database/organisation.repository';

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const Validator = new SchemaValidator()
const database = new Database()

database.initialize()
  .then(async (connection: Connection) => {
    const organisationRepository = new OrganisationRepository(connection)

    const UseCase
        = new OrganisationUseCas(organisationRepository)

    const Handler = new OrganisationHandl(UseCase, Validator)
    const routes = new Routes(Handler)

    app.use('/organisation', routes.Organisation())
  })
  .catch(err => console.log(err))

app.listen(3000, () => console.log('APP Listening on 3000'))
