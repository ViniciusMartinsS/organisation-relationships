import { CreatePayload, CreateReturn, ListReturn, ListParams } from '../domain/organisation.interface';
import { Handler, UseCase, Validator } from "../domain/organisation.interface";

class OrganisationHandler implements Handler {
  private organisationUseCase: UseCase;
  private schemaValidator: Validator;

  public constructor(organisationUseCase: UseCase, schemaValidator: Validator) {
    this.organisationUseCase = organisationUseCase;
    this.schemaValidator = schemaValidator;
  }

  public async list(params: ListParams): Promise<ListReturn> {
    try {
      this.schemaValidator
        .validate(params, 'LIST_ORGANISATION_SCHEMA');

      const { organisation, offset } = params;

      const result = await this.organisationUseCase
        .list(organisation, offset);

      return result;
    } catch (error) {
      if (error?.code) throw error;

      console.log('[ LOG | ERROR ] => HANDLER | LIST', error?.message);

      const errThrown = { code: 'SY500', trace: 'list' };
      throw errThrown;
    }
  }

  public async create(payload: CreatePayload): Promise<CreateReturn> {
    try {
      this.schemaValidator
        .validate(payload, 'CREATE_ORGANISATION_SCHEMA');

      const result = await this.organisationUseCase
        .create(payload);

      return result
    } catch (error) {
      if (error?.code) throw error;

      console.log('[ LOG | ERROR ] => HANDLER | CREATE', error?.message);

      const errThrown = { code: 'SY500', trace: 'create' };
      throw errThrown;
    }
  }
}

export default OrganisationHandler;
