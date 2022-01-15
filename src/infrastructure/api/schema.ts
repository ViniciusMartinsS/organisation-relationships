import express from 'express';
import { Validator } from '../../domain/organisation.interface';
import { ORGANISATION_SCHEMA } from '../constants';

class SchemaValidator implements Validator {
  public validate(request: express.Request): void {
    const { error } = ORGANISATION_SCHEMA.validate(request.body);

    if (!error) {
      return;
    }
    console.log(error);

    const err = { context: 'validation', message: 'invalid' };
    throw err;
  }
}

export default SchemaValidator;
