import { MigrationInterface, QueryRunner } from "typeorm";

export class Relationsfixed1731625356334 implements MigrationInterface {
    name = 'Relationsfixed1731625356334'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock" DROP CONSTRAINT "FK_b2be25bd3e78455fe801c45e892"`);
        await queryRunner.query(`ALTER TABLE "stock" RENAME COLUMN "warehouse_id" TO "warehouses_id"`);
        await queryRunner.query(`ALTER TABLE "stock" ADD CONSTRAINT "FK_8a2e3075eadcac9919e6136158a" FOREIGN KEY ("warehouses_id") REFERENCES "warehouse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock" DROP CONSTRAINT "FK_8a2e3075eadcac9919e6136158a"`);
        await queryRunner.query(`ALTER TABLE "stock" RENAME COLUMN "warehouses_id" TO "warehouse_id"`);
        await queryRunner.query(`ALTER TABLE "stock" ADD CONSTRAINT "FK_b2be25bd3e78455fe801c45e892" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
