import {
  CreatePayload,
  ListReturn,
  Repository,
  SanitatedPayload,
  UseCase
} from '../domain/organisation.interface';

class OrganisationUseCase implements UseCase {
  private OrganisationRepository: Repository;

  public constructor(organisationRepository: Repository) {
    this.OrganisationRepository = organisationRepository;
  }

  public async list(organisation: string, offset?: number): Promise<ListReturn> {
    try {
      const [ response ] = await this.OrganisationRepository
        .findByOrganisation(organisation, offset);

      return response;
    } catch (error) {
      console.log('Hi', error);
    }
  }

  public async create(payload: CreatePayload): Promise<any> {
    try {
      const sanitizePayloadArray = [];
      const sanitizedPayload =
        this.sanitizePayload(payload, sanitizePayloadArray);

      const headquarters = [];
      const branches = [];

      for (let index = 0; index < sanitizedPayload.length; index++) {
        const { name, organisation } = sanitizedPayload[index];

        const queryHeadquarters = this.OrganisationRepository
          .createOrganisations(name);
        headquarters.push(queryHeadquarters);

        const queryBranches = this.OrganisationRepository
          .createOrganisations(organisation);
        branches.push(queryBranches);
      }

      const headquarter = await Promise.all(headquarters);
      const branch = await Promise.all(branches);

      const headquartersAndBranches = [];
      for (let index = 0; index < headquarter.length; index++) {
        const query = this.OrganisationRepository
          .createOrganisationBranch(headquarter[index], branch[index]);
        headquartersAndBranches.push(query);
      }

      await Promise.all(headquartersAndBranches)

      const result = {
        count: {
          organisation: headquarters.length,
          daughters: branches.length,
          total: headquarters.length + branches.length
        },
        rows: payload
      };

      return result;
    } catch (error) {
      console.log('Hi', error);
    }
  }

  private sanitizePayload(
    payload: CreatePayload,
    sanitizePayloadArray: Array<SanitatedPayload>
  ): Array<SanitatedPayload> {
    const { org_name: name, daughters } = payload;

    if (!name || (name && !daughters)) {
      return sanitizePayloadArray;
    }

    const organisation = daughters.map((daughter: CreatePayload): string => daughter.org_name);
    sanitizePayloadArray.push({ name, organisation });

    this.handleDaughter(daughters, sanitizePayloadArray);
    return sanitizePayloadArray;
  }

  private handleDaughter(
    daughters: CreatePayload[],
    sanitizePayloadArray: Array<SanitatedPayload>
  ): void {
    for (let index = 0; index < daughters.length; index++) {
      const daughter = daughters[index];
      this.sanitizePayload(daughter, sanitizePayloadArray);
    }
  }
}

export default OrganisationUseCase;
