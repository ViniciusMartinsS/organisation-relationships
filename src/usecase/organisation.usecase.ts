import { ERROR } from '../constants.src';
import {
  CreatePayload,
  CreateReturn,
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

  public async list(organisation: string, offset?: string): Promise<ListReturn> {
    try {
      const [ response ] = await this.OrganisationRepository
        .findByOrganisation(organisation, offset);

      return response;
    } catch (error) {
      if (error?.code) throw error;

      console.log('[ LOG | ERROR ] => USE_CASE | LIST', error?.message);
      throw ERROR.INTERNAL_LIST;
    }
  }

  public async create(payload: CreatePayload): Promise<CreateReturn> {
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

        if (!organisation || !organisation.length) {
          continue;
        }

        const queryBranches = this.OrganisationRepository
          .createOrganisations(organisation);
        branches.push(queryBranches);
      }

      const headquarter = await Promise.all(headquarters);

      if (!branches.length) {
        return { rows: payload };
      }

      const branch = await Promise.all(branches);

      const headquartersAndBranches = [];
      for (let index = 0; index < headquarter.length; index++) {
        const query = this.OrganisationRepository
          .createOrganisationBranch(headquarter[index], branch[index]);
        headquartersAndBranches.push(query);
      }

      await Promise.all(headquartersAndBranches);
      return { rows: payload };
    } catch (error) {
      if (error?.code) throw error;

      console.log('[ LOG | ERROR ] => USE_CASE | CREATE', error?.message);
      throw ERROR.INTERNAL_CREATE;
    }
  }

  private sanitizePayload(
    payload: CreatePayload,
    sanitizePayloadArray: Array<SanitatedPayload>,
    iteration = false
  ): Array<SanitatedPayload> {
    const { org_name: name, daughters } = payload;
    if (name && !daughters && !iteration) {
      sanitizePayloadArray.push({ name });
      return sanitizePayloadArray;
    }

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
      this.sanitizePayload(daughter, sanitizePayloadArray, true);
    }
  }
}

export default OrganisationUseCase;
