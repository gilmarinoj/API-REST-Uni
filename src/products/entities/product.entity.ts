import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./../../common/config/base.entity";
import { SupplierEntity } from "../../suppliers/entities/supplier.entity";
import { CategoryEntity } from "../../categories/entities/category.entity";

@Entity('product')
export class ProductEntity extends BaseEntity{

    @Column({type: "varchar"})
    name: string;

    @Column({type: "varchar", nullable: true})
    description?: string;

    @Column({type: "float", default: 0 })
    price?: number;

    @Column({type: "int", default: 0})
    stock?: number;

    @ManyToOne(() => CategoryEntity, (category) => category.products)
    @JoinColumn({name: 'category_id'})
    category: string;

    @ManyToOne(() => SupplierEntity, (supplier) => supplier.products)
    @JoinColumn({name: 'supplier_id'})
    supplier: string;
}
