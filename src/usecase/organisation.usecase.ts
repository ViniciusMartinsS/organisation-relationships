import express from 'express';
import { UseCase, Repository } from '../domain/organisation.interface';

class OrganisationUseCase implements UseCase {
  private OrganisationRepository: Repository;

  public constructor(organisationRepository: Repository) {
    this.OrganisationRepository = organisationRepository;
  }

  public async list(organisation: string): Promise<any> {
    const response = await this.OrganisationRepository.findByOrganisation(
      organisation,
    );

    return response;
  }

  public async create(request: express.Request): Promise<any> {
    const { body } = request;

    const sum = [];
    const response = this.payloadGenerator(body, sum);

    response.forEach(async (response) => {
      try {
        const organizations = await this.OrganisationRepository.createOrganisations(
          response.organisation,
        );

        const headquarter = await this.OrganisationRepository.createOrganisations(
          response.name,
        );

        await this.OrganisationRepository.createOrganisationBranch(
          headquarter,
          organizations,
        );
      } catch (error) {
        console.log(error);
      }
    });

    return 'this.OrganisationRepository';
  }

  private payloadGenerator(body, sum): Array<any> {
    const { org_name: name, daughters } = body;

    if (!name || (name && !daughters)) {
      return sum;
    }

    const organisation = daughters.map((daughter) => daughter.org_name);
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
