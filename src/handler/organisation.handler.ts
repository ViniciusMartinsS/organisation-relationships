import express from 'express'

import {
  OrganisationHandler,
  OrganisationUseCase,
  SchemaValidato
} from "../domain/organisation.interface"

class OrganisationHandl implements OrganisationHandler {
  private OrganisationUseCase: OrganisationUseCase
  private schemaValidator: SchemaValidato

  constructor(
    organisationUseCase: OrganisationUseCase,
    schemaValidator: SchemaValidato
  ) {
    this.OrganisationUseCase = organisationUseCase
    this.schemaValidator = schemaValidator
   }

  list(request: express.Request): any {
    const { params: { id } } = request

    return this.OrganisationUseCase
      .list(id)
  }

  create(request: express.Request): any {
    try {
      this.schemaValidator
        .validate(request)

      return this.OrganisationUseCase
        .create(request)
    } catch (error) {
      console.log(error)
    }
  }
}

export default OrganisationHandl
