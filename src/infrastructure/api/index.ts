import express from 'express';
import Database from '../database';
import OrganisationHandler from '../../handler/organisation.handler';
import OrganisationUseCase from '../../usecase/organisation.usecase';
import OrganisationRepository from '../database/organisation.repository';
import Routes from './routes';
import SchemaValidator from './schema';

const app = express();

(async (): Promise<void> => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  await initialize();

  app.listen(3000, () => console.log('APP Listening on 3000'));
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

    app.use('/organisation', routes.Organisation());

    console.log('All dependencies initialized!\n')
  } catch (error) {
    console.log('It was not possible to start the application.', error)
  }
}
