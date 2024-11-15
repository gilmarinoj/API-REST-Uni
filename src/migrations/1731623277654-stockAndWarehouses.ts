import { MigrationInterface, QueryRunner } from "typeorm";

export class StockAndWarehouses1731623277654 implements MigrationInterface {
    name = 'StockAndWarehouses1731623277654'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stock" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "quantity" integer NOT NULL, "description" character varying NOT NULL, "warehouses_id" uuid, "product_id" uuid, CONSTRAINT "PK_092bc1fc7d860426a1dec5aa8e9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "warehouse" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_965abf9f99ae8c5983ae74ebde8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "stock" ADD CONSTRAINT "FK_8a2e3075eadcac9919e6136158a" FOREIGN KEY ("warehouses_id") REFERENCES "warehouse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stock" ADD CONSTRAINT "FK_375ba760c8cff338fc8c94b416c" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock" DROP CONSTRAINT "FK_375ba760c8cff338fc8c94b416c"`);
        await queryRunner.query(`ALTER TABLE "stock" DROP CONSTRAINT "FK_8a2e3075eadcac9919e6136158a"`);
        await queryRunner.query(`DROP TABLE "warehouse"`);
        await queryRunner.query(`DROP TABLE "stock"`);
    }

}
