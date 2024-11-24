import { BaseEntity } from "../../common/config/base.entity";
import { StockEntity } from "../../stocks/entities/stock.entity"
import { Column, Entity, OneToMany } from "typeorm"

@Entity('warehouse')
export class WarehouseEntity extends BaseEntity{

    @Column({type: "varchar"})
    warehouse_name: string

    @Column({type: "varchar"})
    description?: string

    @OneToMany(() => StockEntity, (stocks) => stocks.warehouses)
    stocks: StockEntity[];
}
