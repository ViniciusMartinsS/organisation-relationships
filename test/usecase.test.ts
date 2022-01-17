import { expect } from 'chai';
import OrganisationUseCase from '../src/usecase/organisation.usecase';
import OrganisationRepositoryMock from './mocks/organisation.repository.mock';

const listInternalErrorResult = { code: 'SY500', trace: 'list' };
const createInternalErrorResult = { code: 'SY500', trace: 'create' };

describe('Use Case Suite Tests', () => {
  it('[LIST] Expect error thread error from repository', async () => {
    try {
      const organisationRepositoryMock = new OrganisationRepositoryMock(true, true);
      const organisationUseCase = new OrganisationUseCase(organisationRepositoryMock);

      const response = await organisationUseCase.list('test', '0');
      expect(response).to.be.equal(undefined);
    } catch (error) {
      expect(typeof error).to.be.equal('object');
      expect(error).to.contains(listInternalErrorResult);
    }
  });

  it('[LIST] Expect 500 when repository error return is not thread', async () => {
    try {
      const organisationRepositoryMock = new OrganisationRepositoryMock(true);
      const organisationUseCase = new OrganisationUseCase(organisationRepositoryMock);

      const response = await organisationUseCase.list('test', '0');
      expect(response).to.be.equal(undefined);
    } catch (error) {
      expect(typeof error).to.be.equal('object');
      expect(error).to.contains(listInternalErrorResult);
    }
  });

  it('[LIST] Expect call repository to list organisations', async () => {
    const organisationRepositoryMock = new OrganisationRepositoryMock(false);
    const organisationUseCase = new OrganisationUseCase(organisationRepositoryMock);

    const response = await organisationUseCase.list('test', '0');
    expect(response).to.be.not.equal(undefined);
    expect(typeof response).to.be.equal('object');
  });

  it('[CREATE] Expect 500 when repository error thread', async () => {
    try {
      const organisationRepositoryMock = new OrganisationRepositoryMock(true, true);
      const organisationUseCase = new OrganisationUseCase(organisationRepositoryMock);

      const response = await organisationUseCase.create(
        { org_name: "Paradise Island", "daughters": [ { org_name: "Yellow Banana" } ] }
      );
      expect(response).to.be.equal(undefined);
    } catch (error) {
      expect(typeof error).to.be.equal('object');
      expect(error).to.contains(createInternalErrorResult);
    }
  });

  it('[CREATE] Expect 500 when repository error return is not thread', async () => {
    try {
      const organisationRepositoryMock = new OrganisationRepositoryMock(true);
      const organisationUseCase = new OrganisationUseCase(organisationRepositoryMock);

      const response = await organisationUseCase.create(
        { org_name: "Paradise Island", "daughters": [ { org_name: "Yellow Banana" } ] }
      );
      expect(response).to.be.equal(undefined);
    } catch (error) {
      expect(typeof error).to.be.equal('object');
      expect(error).to.contains(createInternalErrorResult);
    }
  });

  it('[CREATE] Expect call repository to create organisations', async () => {
    const organisationRepositoryMock = new OrganisationRepositoryMock(false);
    const organisationUseCase = new OrganisationUseCase(organisationRepositoryMock);

    const response = await organisationUseCase.create(
      { org_name: "Paradise Island", "daughters": [ { org_name: "Yellow Banana" } ] }
    );
    expect(response).to.be.not.equal(undefined);
    expect(typeof response).to.be.equal('object');
  });

  it('[CREATE] Expect call repository to create one organisation', async () => {
    const organisationRepositoryMock = new OrganisationRepositoryMock(false);
    const organisationUseCase = new OrganisationUseCase(organisationRepositoryMock);

    const response = await organisationUseCase.create({ org_name: "Paradise Island" });
    expect(response).to.be.not.equal(undefined);
    expect(typeof response).to.be.equal('object');
  });
});
