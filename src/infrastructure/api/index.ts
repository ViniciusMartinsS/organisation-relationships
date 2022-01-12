import express from 'express'

import OrganisationHandl from '../../handler/organisation.handler'
import OrganisationUseCas from '../../usecase/organisation.usecase'
import SchemaValidator from './schema';
import Database from '../database';
import { Organisation } from '../database/entity';

const app = express()
let Handler = null

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

    Handler = new OrganisationHandl(UseCase, Validator)
  })
  .catch(err => console.log(err))

app.get('/', (request: express.Request, response: express.Response) => {
  response.status(200).send(Handler.list())
})

app.post('/', (request: express.Request, response: express.Response) => {
  Handler.create(request)
  response.status(200).send(Handler.list())
})

app.listen(3000, () => console.log('APP Listening on 3000'))
