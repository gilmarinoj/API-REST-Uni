import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedAndUpdated1731081442098 implements MigrationInterface {
    name = 'CreatedAndUpdated1731081442098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "supplier" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_2bc0d2cab6276144d2ff98a2828" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "category" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "category" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "created_at"`);
        await queryRunner.query(`DROP TABLE "supplier"`);
    }

}
