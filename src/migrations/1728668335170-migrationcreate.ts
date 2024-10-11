import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrationcreate1728668335170 implements MigrationInterface {
    name = 'Migrationcreate1728668335170'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "navigation_item" ADD "index" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "navigation_item" DROP COLUMN "index"`);
    }

}
