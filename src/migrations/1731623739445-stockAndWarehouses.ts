import { MigrationInterface, QueryRunner } from "typeorm";

export class StockAndWarehouses1731623739445 implements MigrationInterface {
    name = 'StockAndWarehouses1731623739445'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "stock"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "stock" integer NOT NULL DEFAULT '0'`);
    }

}
