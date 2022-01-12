import express from 'express'
import { OrganisationUseCase } from "../domain/organisation.interface"

class OrganisationUseCas implements OrganisationUseCase {
  private OrganisationRepository: any

  constructor(organisationRepository: any) {
    this.OrganisationRepository = organisationRepository
   }

  list(): any {
    if (this.OrganisationRepository) {
      console.log('')
    }
    return ''
  }

  async create(request: express.Request): Promise<any> {
    const { body } = request;
    const name = body.map(content => ({ name: content.org_name }))

    const response = await this.OrganisationRepository
      .createQueryBuilder()
      .insert()
      .orIgnore()
      .values(name)
      .execute();

    console.log(response)

    return 'this.OrganisationRepository'
  }
}


export default OrganisationUseCas
