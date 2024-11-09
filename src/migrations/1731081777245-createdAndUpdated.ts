import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedAndUpdated1731081777245 implements MigrationInterface {
    name = 'CreatedAndUpdated1731081777245'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "is_active" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "is_active" DROP DEFAULT`);
    }

}
