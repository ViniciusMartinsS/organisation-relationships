import { Connection } from 'mysql2/promise';

class OrganisationRepository {
  private connection: Connection

  constructor(connection) {
    this.connection = connection
  }

  public async createOrganisations(content: Array<number> | number): Promise<any> {
    content = !Array.isArray(content) ? [ content ] : content

    const sanitize_ = content.map(value => `("${value}")`).join(" ,")

    const query = `INSERT IGNORE INTO organisation(name) VALUES${sanitize_};`

    await this.connection
      .query(query) as any

    const sanitize = content.map(value => `"${value}"`).join(" ,")

    const select = `SELECT id FROM organisation WHERE name IN (${sanitize});`

    const [ organizations ] = await this.connection
      .query(select, content) as any

    return organizations.map(({ id }): number => id)
  }

  public async createOrganisationBranch(
    [ headquarter ]: Array<number>, branches: Array<number>
  ): Promise<void> {
    let query = `INSERT IGNORE INTO organisation_branch(headquarter_id, branch_id) VALUES`

    branches.forEach((branch: number): void => {
      query = `${query} (${headquarter}, ${branch}),`
    });

    query = query.slice(0, -1)

    await this.connection
      .query(query) as any
  }
}

export default OrganisationRepository
