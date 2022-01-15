import { Connection } from 'mysql2/promise';

const sanitize = content => content.map(value => `"${value}"`).join(" ,")

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

    const select = `SELECT id FROM organisation WHERE name IN (${sanitize(content)});`

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

  public async findByOrganisation(organisation: string): Promise<any> {
    const promises = []

    let query = this.prepareFindQuery(organisation, 'branch')
    promises.push(this.connection.query(query))

    query = this.prepareFindQuery(organisation, 'headquarter')
    promises.push(this.connection.query(query))

    const [ [ branches ], [ headquarters ] ] = await Promise.all(promises)

    if (!headquarters?.length){
      return { branches }
    }

    const parent = headquarters.map(({ name }) => name)

    query = this.prepareFindQuery(parent, 'branch', organisation)
    const [ sisters ] = await this.connection.query(query) as any

    if (!sisters?.length){
      return { branches, headquarters }
    }

    return { branches, headquarters, ...(sisters.length && { sisters }) }
  }

  private prepareFindQuery(
    organisation: string | Array<string>,
    type: string,
    current_organization: string | Array<string> = organisation
  ): string {
    const FIRST_JOIN = { headquarter: 'branch_id', branch: 'headquarter_id' }[type]
    const SECOND_JOIN = { headquarter: 'headquarter_id', branch: 'branch_id' }[type]

    const WHERE_NAME = !Array.isArray(organisation)
      ? `o.name = "${organisation}"`
      : `o.name IN (${sanitize(organisation)})`

    return ` SELECT DISTINCT oo.name FROM organisation AS o
      RIGHT JOIN organisation_branch AS ob
      ON o.id = ob.${FIRST_JOIN}
      LEFT JOIN organisation AS oo
      ON ob.${SECOND_JOIN} = oo.id
      WHERE ${WHERE_NAME} AND oo.name != "${current_organization}";
    `
  }
}

export default OrganisationRepository
