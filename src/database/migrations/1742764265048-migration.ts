import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1742764265048 implements MigrationInterface {
  name = 'Migration1742764265048';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`destination\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`award\` float NOT NULL DEFAULT 0, \`limit\` int NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`destination\``);
  }
}
