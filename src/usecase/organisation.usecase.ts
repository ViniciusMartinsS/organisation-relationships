import { UseCase, Repository, CreatePayload } from '../domain/organisation.interface';

class OrganisationUseCase implements UseCase {
  private OrganisationRepository: Repository;

  public constructor(organisationRepository: Repository) {
    this.OrganisationRepository = organisationRepository;
  }

  public async list(organisation: string, offset?: number): Promise<any> {
    try {
      const [ response ] = await this.OrganisationRepository
        .findByOrganisation(organisation, offset);
      console.log(response)
      return response;
    } catch (error) {
      console.log('Hi', error);
    }
  }

  public async create(payload: CreatePayload): Promise<any> {
    try {
      const sum = [];
      const response = this.payloadGenerator(payload, sum);

      response.forEach(async (response: any) => {
        const organizations = await this.OrganisationRepository
          .createOrganisations(response.organisation);

        const headquarter = await this.OrganisationRepository
          .createOrganisations(response.name);

        await this.OrganisationRepository
          .createOrganisationBranch(headquarter, organizations);
      });

      return `The registers were successfully saved!`;
    } catch (error) {
      console.log('Hi', error);
    }
  }

  private payloadGenerator(payload, sum): Array<any> {
    const { org_name: name, daughters } = payload;

    if (!name || (name && !daughters)) {
      return sum;
    }

    const organisation = daughters.map((daughter: any) => daughter.org_name);
    sum.push({ name, organisation });

    this.handleDaughter(daughters, sum);
    return sum;
  }

  private handleDaughter(daughters, sum): void {
    for (let index = 0; index < daughters.length; index++) {
      const daughter = daughters[index];
      this.payloadGenerator(daughter, sum);
    }
  }
}

export default OrganisationUseCase;
