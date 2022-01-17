import { ERROR } from '../constants.src';
import { CreatePayload, Validator, ListParams } from '../domain/organisation.interface';
import * as SCHEMAS_VALIDATORS from "./constants.handler";

class SchemaValidator implements Validator {
  public validate(values: CreatePayload | ListParams, schema: string): void {
    const { error } = SCHEMAS_VALIDATORS[schema].validate(values);

    if (!error) {
      return;
    }

    const { message } = error;
    console.log('[ LOG | ERROR ] => SCHEMA_VALIDATOR | VALIDATE', message);

    const err = { ...ERROR.INVALID_PAYLOAD_CREATE, ...(message && { message }) };
    throw err;
  }
}

export default SchemaValidator;
