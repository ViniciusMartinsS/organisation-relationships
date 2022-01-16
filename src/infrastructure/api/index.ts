import 'dotenv/config'
import express from 'express';
import Database from '../database';
import OrganisationHandler from '../../handler/organisation.handler';
import OrganisationUseCase from '../../usecase/organisation.usecase';
import OrganisationRepository from '../database/organisation.repository';
import Routes from './routes.api';
import SchemaValidator from '../../handler/schema.handler';

const app = express();
const PORT = process.env.PORT;

(async (): Promise<void> => {
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true }));

  await initialize();

  app.listen(PORT, () => console.log(`APP Listening on ${PORT}`));
})();

async function initialize(): Promise<void> {
  try {
    const database = new Database();
    const connection = await database.initialize();

    const organisationRepository = new OrganisationRepository(connection);

    const organisationUseCase = new OrganisationUseCase(organisationRepository);

    const schemaValidator = new SchemaValidator();

    const organisationHandler = new OrganisationHandler(
      organisationUseCase,
      schemaValidator
    );

    const routes = new Routes(organisationHandler);

    app.use('/organisation', routes.organisation());

    console.log('All dependencies initialized!\n')
  } catch (error) {
    console.log('It was not possible to start the application.', error)
  }
}
