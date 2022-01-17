import { CreatePayload, Validator } from "../domain/organisation.interface";
import { ORGANISATION_SCHEMA } from "./constants.handler";

class SchemaValidator implements Validator {
  public validate(payload: CreatePayload): void {
    const { error } = ORGANISATION_SCHEMA.validate(payload);

    if (!error) {
      return;
    }

    const { message } = error;
    console.log('[ LOG | ERROR ] => SCHEMA_VALIDATOR | VALIDATE', message);

    const err = { code: 'SY400', trace: 'validate', ...(message && { message }) };
    throw err;
  }
}

export default SchemaValidator;
