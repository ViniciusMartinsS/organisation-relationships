import express from 'express'
import { SchemaValidato } from '../../domain/organisation.interface'
import { ORGANISATION_SCHEMA } from '../constants'

class SchemaValidator implements SchemaValidato {

  validate(request: express.Request): void {
      const { error } = ORGANISATION_SCHEMA
        .validate(request.body)

      if (!error) { return }
      console.log(error)

      throw { context: 'validation', message: 'invalid' }
  }
}

export default SchemaValidator
