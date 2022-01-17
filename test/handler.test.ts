import { expect } from 'chai';
import OrganisationHandler from '../src/handler/organisation.handler';
import SchemaValidator from '../src/handler/schema.handler';
import OrganisationUseCaseMock from './mocks/organisation.usecase.mock';
import { ListParams, CreatePayload } from '../src/domain/organisation.interface';

const listJoiErrorResult = {
  code: 'SY400',
  trace: 'validate',
  message: '"organisation" is required'
};
const listInternalErrorResult = { code: 'SY500', trace: 'list' };

const createJoiErrorResult = {
  code: 'SY400',
  trace: 'validate',
  message: '"org_name" is required'
};
const createInternalErrorResult = { code: 'SY500', trace: 'create' };

const schemaValidator = new SchemaValidator();

describe('Handler Suite Tests', () => {
  it('[LIST] Expect JOI error when sending invalid payload to list', async () => {
    try {
      const organisationUseCaseMock = new OrganisationUseCaseMock(false);
      const organisationHandler = new OrganisationHandler(
        organisationUseCaseMock, schemaValidator
      );

      const response = await organisationHandler.list({} as ListParams);
      expect(response).to.be.equal(undefined)
    } catch (error) {
      expect(typeof error).to.be.equal('object')
      expect(error).to.contains(listJoiErrorResult)
    }
  });

  it('[LIST] Expect 500 when error UC return is not thread', async () => {
    try {
      const organisationUseCaseMock = new OrganisationUseCaseMock(true);
      const organisationHandler = new OrganisationHandler(
        organisationUseCaseMock, schemaValidator
      );

      const response = await organisationHandler.list({ organisation: 'organisation', offset: '0' });
      expect(response).to.be.equal(undefined)
    } catch (error) {
      console.log(error)
      expect(typeof error).to.be.equal('object')
      expect(error).to.contains(listInternalErrorResult)
    }
  });

  it('[LIST] Expect handler to call UC successfully', async () => {
    const organisationUseCaseMock = new OrganisationUseCaseMock(false);
    const organisationHandler = new OrganisationHandler(
      organisationUseCaseMock, schemaValidator
    );

    const response = await organisationHandler.list({ organisation: 'organisation', offset: '0' });
    expect(response).to.be.not.equal(undefined)
    expect(typeof response).to.be.equal('object')
  });

  it('[CREATE] Expect JOI error when sending invalid payload to list', async () => {
    try {
      const organisationUseCaseMock = new OrganisationUseCaseMock(false);
      const organisationHandler = new OrganisationHandler(
        organisationUseCaseMock, schemaValidator
      );

      const response = await organisationHandler.create({} as CreatePayload);
      expect(response).to.be.equal(undefined)
    } catch (error) {
      expect(typeof error).to.be.equal('object')
      expect(error).to.contains(createJoiErrorResult)
    }
  });

  it('[CREATE] Expect 500 when error UC return is not thread', async () => {
    try {
      const organisationUseCaseMock = new OrganisationUseCaseMock(true);
      const organisationHandler = new OrganisationHandler(
        organisationUseCaseMock, schemaValidator
      );

      const response = await organisationHandler.create({ org_name: 'org_name' });
      expect(response).to.be.equal(undefined)
    } catch (error) {
      console.log(error)
      expect(typeof error).to.be.equal('object')
      expect(error).to.contains(createInternalErrorResult)
    }
  });

  it('[CREATE] Expect handler to call UC successfully', async () => {
    const organisationUseCaseMock = new OrganisationUseCaseMock(false);
    const organisationHandler = new OrganisationHandler(
      organisationUseCaseMock, schemaValidator
    );

    const response = await organisationHandler.create({ org_name: 'org_name' });
    expect(response).to.be.not.equal(undefined)
    expect(typeof response).to.be.equal('object')
  });
});
