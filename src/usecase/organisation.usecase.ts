import express from 'express'
import { OrganisationUseCase } from "../domain/organisation.interface"

class OrganisationUseCas implements OrganisationUseCase {
  private OrganisationRepository: any

  constructor(organisationRepository: any) {
    this.OrganisationRepository = organisationRepository
   }

  public list(): any {
    if (this.OrganisationRepository) {
      console.log('')
    }
    return ''
  }

  public async create(request: express.Request): Promise<any> {
    const { body } = request;

    const sum = []
    const response = this.payloadGenerator(body, sum)

    response.forEach(async response => {
      const organizations = await this.OrganisationRepository
        .createOrganisations('organisation', response.organisation)

      const headquarter = await this.OrganisationRepository
        .createOrganisations('organisation', response.name)

      await this.OrganisationRepository
        .createOrganisationBranch(headquarter, organizations)

      console.log(response.name, headquarter)
      console.log(organizations, '\n')
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
