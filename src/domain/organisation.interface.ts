import express from 'express'

export interface OrganisationHandler {
  create(request: express.Request): any,
  list(request: express.Request): any
}

export interface OrganisationUseCase {
  create(request: express.Request): any,
  list(organisation: string): any
}

export interface SchemaValidato {
  validate(request: express.Request)
}
