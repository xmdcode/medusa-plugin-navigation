import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrationcreate1727853648208 implements MigrationInterface {
    name = 'Migrationcreate1727853648208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "navigation_item" ADD "order" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "navigation_item" DROP COLUMN "order"`);
    }

}
