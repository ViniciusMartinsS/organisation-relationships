import express from 'express'

export interface OrganisationHandler {
  create(request: express.Request): any,
  list(): any
}

export interface OrganisationUseCase {
  create(request: express.Request): any,
  list(): any
}

export interface SchemaValidato {
  validate(request: express.Request)
}
