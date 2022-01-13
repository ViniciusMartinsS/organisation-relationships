import express from 'express'

import OrganisationHandl from '../../handler/organisation.handler'
import OrganisationUseCas from '../../usecase/organisation.usecase'
import SchemaValidator from './schema';
import Database from '../database';
import { Organisation } from '../database/entity';
import { Routes } from './routes';

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const Validator = new SchemaValidator()
const database = new Database()

database.initialize()
  .then(connection => {
    const organisationRepository
        = connection.getRepository(Organisation)

    const UseCase
        = new OrganisationUseCas(organisationRepository)

    const Handler = new OrganisationHandl(UseCase, Validator)
    const routes = new Routes(Handler)

    app.use('/organisation', routes.Organisation())
  })
  .catch(err => console.log(err))

app.listen(3000, () => console.log('APP Listening on 3000'))
