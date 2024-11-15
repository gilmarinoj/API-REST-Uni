import { Module } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { WarehousesController } from './warehouses.controller';
import { WarehouseEntity } from './entities/warehouse.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [WarehousesController],
  providers: [WarehousesService],
  imports: [
    TypeOrmModule.forFeature([
      WarehouseEntity
    ]),
  ]
})
export class WarehousesModule { }
