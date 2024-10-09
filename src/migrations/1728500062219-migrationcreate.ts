import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrationcreate1728500062219 implements MigrationInterface {
    name = 'Migrationcreate1728500062219'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "navigation_item" RENAME COLUMN "title" TO "name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "navigation_item" RENAME COLUMN "name" TO "title"`);
    }

}
