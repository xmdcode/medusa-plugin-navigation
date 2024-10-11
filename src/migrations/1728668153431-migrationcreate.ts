import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrationcreate1728668153431 implements MigrationInterface {
    name = 'Migrationcreate1728668153431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "navigation_item" DROP COLUMN "order"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "navigation_item" ADD "order" integer NOT NULL DEFAULT '0'`);
    }

}
