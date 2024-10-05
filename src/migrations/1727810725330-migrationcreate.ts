import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrationcreate1727810725330 implements MigrationInterface {
    name = 'Migrationcreate1727810725330'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "navigation" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_a7c90881db5205ad8d6b86ffef7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "navigation_item" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying NOT NULL, "url" character varying, "mpath" character varying DEFAULT '', "parentId" character varying, "navigationId" character varying, CONSTRAINT "PK_f1ab5d46bde4308ca87f4c60378" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "navigation_item" ADD CONSTRAINT "FK_4f4d31fc778461c8e93c96ce1d7" FOREIGN KEY ("parentId") REFERENCES "navigation_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "navigation_item" ADD CONSTRAINT "FK_72a808434a438ed9cffb6887159" FOREIGN KEY ("navigationId") REFERENCES "navigation"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "navigation_item" DROP CONSTRAINT "FK_72a808434a438ed9cffb6887159"`);
        await queryRunner.query(`ALTER TABLE "navigation_item" DROP CONSTRAINT "FK_4f4d31fc778461c8e93c96ce1d7"`);
        await queryRunner.query(`DROP TABLE "navigation_item"`);
        await queryRunner.query(`DROP TABLE "navigation"`);
    }

}
