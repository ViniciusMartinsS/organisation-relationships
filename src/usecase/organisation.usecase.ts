import express from 'express'
import { OrganisationUseCase } from "../domain/organisation.interface"

class OrganisationUseCas implements OrganisationUseCase {
  private OrganisationRepository: any

  constructor(organisationRepository: any) {
    this.OrganisationRepository = organisationRepository
   }

  public async list(organisation: string): Promise<any> {
     await this.OrganisationRepository
          .findByOrganisation(organisation)

    // console.log(response)
    return 'sss'
  }

  public async create(request: express.Request): Promise<any> {
    const { body } = request;

    const sum = []
    const response = this.payloadGenerator(body, sum)

    response.forEach(async response => {
      try {
        const organizations = await this.OrganisationRepository
          .createOrganisations(response.organisation)

        const headquarter = await this.OrganisationRepository
          .createOrganisations(response.name)

        await this.OrganisationRepository
          .createOrganisationBranch(headquarter, organizations)
      } catch (error) {
        console.log(error)
      }
    })

    return 'this.OrganisationRepository'
  }

  private payloadGenerator(body, sum) {
    const { org_name: name, daughters } = body

    if (!name || name && !daughters) {
        return sum
    }

    const organisation = daughters.map(daughter => daughter.org_name)
    sum.push({ name, organisation })

    this.handleDaughter(daughters, sum)
    return sum
  }

  private handleDaughter(daughters, sum) {
    for (let index = 0; index < daughters.length; index++) {
      const daughter = daughters[index]
      this.payloadGenerator(daughter, sum)
    }
  }
}


export default OrganisationUseCas
