import { MigrationInterface, QueryRunner } from "typeorm";

export class Suppliers1731184516965 implements MigrationInterface {
    name = 'Suppliers1731184516965'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supplier" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD "is_active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD "phone" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD "address" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "is_active"`);
        await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "created_at"`);
    }

}
