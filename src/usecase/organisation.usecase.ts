import { OrganisationUseCase } from "../domain/organisation.interface"

class OrganisationUseCas implements OrganisationUseCase {
  private OrganisationRepository: any

  constructor(organisationRepository: any) {
    this.OrganisationRepository = organisationRepository
   }

  list(): any {
    return this.OrganisationRepository
  }

  create(): any {
    return this.OrganisationRepository
  }
}


export default OrganisationUseCas
