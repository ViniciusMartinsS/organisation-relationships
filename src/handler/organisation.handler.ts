import { ERROR } from '../constants.src';
import { CreatePayload, CreateReturn, ListReturn, ListParams } from '../domain/organisation.interface';
import { Handler, UseCase, Validator } from "../domain/organisation.interface";
import { SCHEMA_LIST, SCHEMA_CREATE } from './constants.handler';

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
        .validate(params, SCHEMA_LIST);

      const { organisation, offset } = params;

      const result = await this.organisationUseCase
        .list(organisation, offset);

      return result;
    } catch (error) {
      if (error?.code) throw error;

      console.log('[ LOG | ERROR ] => HANDLER | LIST', error?.message);
      throw ERROR.INTERNAL_LIST;
    }
  }

  public async create(payload: CreatePayload): Promise<CreateReturn> {
    try {
      this.schemaValidator
        .validate(payload, SCHEMA_CREATE);

      const result = await this.organisationUseCase
        .create(payload);

      return result;
    } catch (error) {
      if (error?.code) throw error;

      console.log('[ LOG | ERROR ] => HANDLER | CREATE', error?.message);
      throw ERROR.INTERNAL_CREATE;
    }
  }
}

export default OrganisationHandler;
