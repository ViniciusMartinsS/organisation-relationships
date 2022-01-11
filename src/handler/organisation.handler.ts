import { OrganisationHandler, OrganisationUseCase } from "../domain/organisation.interface"

class OrganisationHandl implements OrganisationHandler {
  private OrganisationUseCase: OrganisationUseCase

  constructor(organisationUseCase: OrganisationUseCase) {
    this.OrganisationUseCase = organisationUseCase
   }

  list(): any {
    return this.OrganisationUseCase.list()
  }

  create(): any {
    return this.OrganisationUseCase.create()
  }
}

export default OrganisationHandl
