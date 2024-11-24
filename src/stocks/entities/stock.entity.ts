import { BaseEntity } from "../../common/config/base.entity";
import { ProductEntity } from "../../products/entities/product.entity";
import { WarehouseEntity } from "../../warehouses/entities/warehouse.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('stock')
export class StockEntity extends BaseEntity{
    
    @Column({type: "int"})
    quantity: number

    @Column({type: "varchar"})
    description?: string

    @ManyToOne(() => WarehouseEntity, (warehouses) => warehouses.stocks)
    @JoinColumn({name: "warehouse_id"})
    warehouses: string;

    @ManyToOne(() => ProductEntity, (product) => product.stocks)
    @JoinColumn({name: "product_id"})
    products: string;
}
