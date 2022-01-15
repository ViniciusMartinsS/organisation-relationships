import express from 'express'

import {
  Handler,
  UseCase,
  Validator
} from "../domain/organisation.interface"

class OrganisationHandler implements Handler {
  private organisationUseCase: UseCase
  private schemaValidator: Validator

  constructor(
    organisationUseCase: UseCase,
    schemaValidator: Validator
  ) {
    this.organisationUseCase = organisationUseCase
    this.schemaValidator = schemaValidator
   }

  public list(request: express.Request): any {
    const { params: { id } } = request

    return this.organisationUseCase
      .list(id)
  }

  public create(request: express.Request): any {
    try {
      this.schemaValidator
        .validate(request)

      return this.organisationUseCase
        .create(request)
    } catch (error) {
      console.log(error)
    }
  }
}

export default OrganisationHandler
