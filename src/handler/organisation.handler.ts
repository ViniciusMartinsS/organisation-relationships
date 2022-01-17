import { CreatePayload, CreateReturn, ListReturn } from '../domain/organisation.interface';
import { Handler, UseCase, Validator } from "../domain/organisation.interface";

class OrganisationHandler implements Handler {
  private organisationUseCase: UseCase;
  private schemaValidator: Validator;

  public constructor(organisationUseCase: UseCase, schemaValidator: Validator) {
    this.organisationUseCase = organisationUseCase;
    this.schemaValidator = schemaValidator;
  }

  public async list(organisation: string, offset?: number): Promise<ListReturn> {
    try {
      if (!organisation) {
        throw new Error('Missing organisation');
      }

      return this.organisationUseCase
        .list(organisation, offset);
    } catch (error) {
      if (error?.code) throw error;

      console.log('[ LOG | ERROR ] => HANDLER | LIST', error?.message);

      const errThrown = { code: 'SY500', trace: 'list' };
      throw errThrown;
    }
  }

  public create(payload: CreatePayload): Promise<CreateReturn> {
    try {
      this.schemaValidator
        .validate(payload);

      return this.organisationUseCase
        .create(payload);
    } catch (error) {
      if (error?.code) throw error;

      console.log('[ LOG | ERROR ] => HANDLER | CREATE', error?.message);

      const errThrown = { code: 'SY500', trace: 'create' };
      throw errThrown;
    }
  }
}

export default OrganisationHandler;
