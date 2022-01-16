import { CreatePayload, Validator } from '../../domain/organisation.interface';
import { ORGANISATION_SCHEMA } from '../constants';

class SchemaValidator implements Validator {
  public validate(payload: CreatePayload): void {
    const { error } = ORGANISATION_SCHEMA.validate(payload);

    if (!error) {
      return;
    }

    const err = { context: 'validation', message: 'invalid' };
    throw err;
  }
}

export default SchemaValidator;
