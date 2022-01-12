import express from 'express'

import OrganisationHandl from '../../handler/organisation.handler'
import OrganisationUseCas from '../../usecase/organisation.usecase'
import SchemaValidator from './schema';

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const Validator = new SchemaValidator()
const UseCase = new OrganisationUseCas("Hello World! Hold On")
const Handler = new OrganisationHandl(UseCase, Validator)

app.get('/', (request: express.Request, response: express.Response) => {
  response.status(200).send(Handler.list())
})

app.post('/', (request: express.Request, response: express.Response) => {
  Handler.create(request)
  response.status(200).send(Handler.list())
})

app.listen(3000, () => console.log('APP Listening on 3000'))
