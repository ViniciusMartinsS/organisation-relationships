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

  public async findByOrganisation(organisation: string): Promise<any> {
    const promises = []

    let query = this.prepareFindQuery(organisation, 'branch')
    promises.push(this.connection.query(query))

    query = this.prepareFindQuery(organisation, 'headquarter')
    promises.push(this.connection.query(query))

    const [ [ branches ], [ headquarters ] ] = await Promise.all(promises)

    if (!headquarters.length){
      return { branches }
    }

    const parent = headquarters.map(({ name }) => {
      const query = this.prepareFindQuery(name, 'branch', organisation)
      return this.connection.query(query)
    })

    const [ sisters ] = await Promise.all(parent)as any
    console.log(sisters)

    return { branches, headquarters } // ...(sisters.length && { sisters })
  }

  private prepareFindQuery(
    organisation: string,
    type: string,
    current_organization: string = organisation
  ): string {
    const FIRST_JOIN = { headquarter: 'branch_id', branch: 'headquarter_id' }[type]
    const SECOND_JOIN = { headquarter: 'headquarter_id', branch: 'branch_id' }[type]

    return ` SELECT oo.name FROM organisation AS o
      RIGHT JOIN organisation_branch AS ob
      ON o.id = ob.${FIRST_JOIN}
      LEFT JOIN organisation AS oo
      ON ob.${SECOND_JOIN} = oo.id
      WHERE o.name = "${organisation}" AND oo.name != "${current_organization}";
    `
  }
}

export default OrganisationRepository
