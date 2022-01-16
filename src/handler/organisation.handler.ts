import { CreatePayload } from '../domain/organisation.interface';
import {
  Handler,
  UseCase,
  Validator
} from "../domain/organisation.interface";

class OrganisationHandler implements Handler {
  private organisationUseCase: UseCase;
  private schemaValidator: Validator;

  public constructor(
    organisationUseCase: UseCase,
    schemaValidator: Validator
  ) {
    this.organisationUseCase = organisationUseCase;
    this.schemaValidator = schemaValidator;
  }

  public list(organisation: string, offset?: number): any {
    try {
      if (!organisation) {
        throw new Error('Missing organisation');
      }

      return this.organisationUseCase
        .list(organisation, offset);
    } catch (error) {
      console.log('Hi', error);
    }
  }

  public create(payload: CreatePayload): any {
    try {
      this.schemaValidator
        .validate(payload);

      return this.organisationUseCase
        .create(payload);
    } catch (error) {
      console.log('Hi', error);
    }
  }
}

export default OrganisationHandler;
