export interface CreatePayload {
  org_name: string;
  daughters: Array<CreatePayload>;
}
export interface Handler {
  create(payload: CreatePayload): any;
  list(organisation: string, offset?: number): any;
}

export interface UseCase {
  create(payload: CreatePayload): any;
  list(organisation: string, offset?: number): any;
}

export interface Validator {
  validate(payload: CreatePayload): void;
}

export interface Repository {
  createOrganisations(content: Array<number> | number): Promise<any>;
  createOrganisationBranch(
    headquarter: Array<number>,
    branches: Array<number>,
  ): Promise<any>;
  findByOrganisation(organisation: string, offset?: number): Promise<any>;
}
