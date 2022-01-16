import { Connection } from 'mysql2/promise';
import { Repository } from '../../domain/organisation.interface';

const sanitize = (content: Array<number | string>): string =>
  content.map((value: any) => `"${value}"`).join(' ,');

class OrganisationRepository implements Repository {
  private connection: Connection;

  public constructor(connection: Connection) {
    this.connection = connection;
  }

  public async createOrganisations(
    content: Array<number> | number
  ): Promise<any> {
    try {
      content = !Array.isArray(content) ? [ content ] : content;

      const sanitize_ = content.map((value: any) => `("${value}")`).join(' ,');
      const query = `INSERT IGNORE INTO organisation(name) VALUES${sanitize_};`;

      await this.connection
        .query(query) as any;

      const select = `SELECT id FROM organisation WHERE name IN (${sanitize(content)});`;
      const [ organizations ] = await this.connection
        .query(select, content) as any;

      return organizations.map(({ id }): number => id);
    } catch (error) {
      console.log('Hi', error);
    }
  }

  public async createOrganisationBranch(
    [ headquarter ]: Array<number>,
    branches: Array<number>
  ): Promise<void> {
    try {
      let query = `INSERT IGNORE INTO organisation_branch(headquarter_id, branch_id) VALUES`;

      branches.forEach((branch: number): void => {
        query = `${query} (${headquarter}, ${branch}),`;
      });

      query = query.slice(0, -1);

      await this.connection
        .query(query) as any;
    } catch (error) {
      console.log('Hi', error);
    }
  }

  public async findByOrganisation(organisation: string, offset = 0): Promise<any> {
    try {
      const query = this.prepareFindQuery(organisation, offset);
      console.log(query)
      return this.connection
        .query(query) as any;
    } catch (error) {
      console.log('Hi', error);
    }
  }

  private prepareFindQuery(organisation: string, offset: number): string {
    return `
    SELECT *
    FROM(
      SELECT o.name AS org_name, 'parent' AS relationship_type FROM organisation
          INNER JOIN organisation_branch
          ON organisation.id = organisation_branch.branch_id
          INNER JOIN organisation o
          ON organisation_branch.headquarter_id = o.id
          WHERE organisation.name = "${organisation}"
      UNION
      SELECT o.name AS org_name, 'daughter' AS relationship_type FROM organisation
        INNER JOIN organisation_branch
        ON organisation.id = organisation_branch.headquarter_id
        INNER JOIN organisation o
          ON organisation_branch.branch_id = o.id
      WHERE organisation.name = "${organisation}"
      UNION
      SELECT o.name AS org_name, 'sister' AS relationship_type FROM organisation
        INNER JOIN organisation_branch
        ON organisation.id = organisation_branch.headquarter_id
          INNER JOIN organisation o
          ON organisation_branch.branch_id = o.id
      WHERE organisation.id IN (
        SELECT organisation_branch.headquarter_id  FROM organisation
          INNER JOIN organisation_branch
          ON organisation.id = organisation_branch.branch_id
          WHERE organisation.name = "${organisation}"
      )
      AND o.name != "${organisation}"
    ) RESULT ORDER BY org_name LIMIT 100 OFFSET ${offset};
  `;
  }
}

export default OrganisationRepository;
