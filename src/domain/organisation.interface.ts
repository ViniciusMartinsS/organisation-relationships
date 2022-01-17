export interface CreatePayload {
  org_name: string;
  daughters: Array<CreatePayload>;
}

export interface ListReturn {
  org_name: string;
  relationship_type: string;
}

export interface CreateReturn {
  count: number;
  rows: CreatePayload
}

export interface Handler {
  create(payload: CreatePayload): Promise<CreateReturn>;
  list(organisation: string, offset?: number): Promise<ListReturn>;
}

export interface UseCase {
  create(payload: CreatePayload): Promise<CreateReturn>;
  list(organisation: string, offset?: number): Promise<ListReturn>;
}

export interface Validator {
  validate(payload: CreatePayload): void;
}

export interface Repository {
  createOrganisations(content: Array<string> | string): Promise<Array<number>>;
  createOrganisationBranch(
    headquarter: Array<number>,
    branches: Array<number>,
  ): Promise<void>;
  findByOrganisation(organisation: string, offset?: number): Promise<Array<ListReturn>>;
}

export interface SanitatedPayload {
  name: string;
  organisation: Array<string>
}
