import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrganisationDatabase1642015952090 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS organisation (
                id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
                name VARCHAR(255) NOT NULL UNIQUE
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS organisation;`);
  }
}
