import { ListReturn, Repository } from '../../src/domain/organisation.interface';

class OrganisationRepositoryMock implements Repository {
  private error: boolean;
  private rp: boolean;

  public constructor(error: boolean, rp?: boolean) {
    this.error = error;
    this.rp = rp;
  }

  public async createOrganisations(): Promise<Array<number>> {
    if (this.error && this.rp) {
      const err = { code: 'SY500', trace: 'create' };
      throw err;
    }

    if (this.error) {
      const err = { code: null, error: 'error' };
      throw err;
    }

    return [ 1, 2, 3 ];
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async createOrganisationBranch(): Promise<void> {}

  public async findByOrganisation(): Promise<Array<ListReturn>> {
    if (this.error && this.rp) {
      const err = { code: 'SY500', trace: 'list' };
      throw err;
    }

    if (this.error) {
      const err = { code: null, error: 'error' };
      throw err;
    }

    return [ {
      org_name: 'string',
      relationship_type: ''
    } ];
  }
}

export default OrganisationRepositoryMock;
