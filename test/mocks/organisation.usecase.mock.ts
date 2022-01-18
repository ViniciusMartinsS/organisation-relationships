import {
  CreateReturn,
  ListReturn,
  UseCase
} from '../../src/domain/organisation.interface';

class OrganisationUseCaseMock implements UseCase {
  private error: boolean;

  public constructor(error: boolean) {
    this.error = error;
  }

  public async list(): Promise<ListReturn> {
    if (this.error) {
      const err = { code: null, error: 'error' };
      throw err;
    }

    const response = { org_name: 'success', relationship_type: 'parent' } as ListReturn;
    return response;
  }

  public async create(): Promise<CreateReturn> {
    if (this.error) {
      const err = { code: null, error: 'error' };
      throw err;
    }

    const response = { count: 1, rows: { org_name: 'success' } } as CreateReturn;
    return response;
  }
}

export default OrganisationUseCaseMock;
