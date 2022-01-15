import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrganisationBranchDatabase1642209179650 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS organisation_branch (
                id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
                headquarter_id INT NOT NULL,
                branch_id INT NOT NULL,
                FOREIGN KEY (headquarter_id)
                REFERENCES organisation(id),
                FOREIGN KEY (branch_id)
                REFERENCES organisation(id)
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE organisation_branch DROP CONSTRAINT IF EXISTS organisation_branch_ibfk_1;
            ALTER TABLE organisation_branch DROP CONSTRAINT IF EXISTS organisation_branch_ibfk_2;

            DROP TABLE IF EXISTS organisation_branch;
        `);
  }
}
