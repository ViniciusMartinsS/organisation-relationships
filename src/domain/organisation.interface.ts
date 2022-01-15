import express from 'express'

export interface Handler {
  create(request: express.Request): any,
  list(request: express.Request): any
}

export interface UseCase {
  create(request: express.Request): any,
  list(organisation: string): any
}

export interface Validator {
  validate(request: express.Request): void
}
