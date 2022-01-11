import express from 'express'

import OrganisationHandl from '../handler/organisation.handler'
import OrganisationUseCas from '../usecase/organisation.usecase'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const UseCase = new OrganisationUseCas("Hello World! Hold On")
const Handler = new OrganisationHandl(UseCase)

app.get('/', function (req, res) {
  res.status(200).send(Handler.list())
})

app.listen(3000, () => console.log('APP Listening on 3000'))
