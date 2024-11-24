import { Injectable } from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WarehouseEntity } from './entities/warehouse.entity';
import { Repository, UpdateResult } from 'typeorm';
import { ManagerError } from '@/common/errors/manager.error';
import { PaginationDto } from '@/common/dtos/pagination/pagination.dto';
import { ResponseAllWarehouses } from './interfaces/response-warehouses.interface';
import { AllApiResponse } from '@/common/interfaces/response-api.interface';

@Injectable()
export class WarehousesService {

  constructor(
    @InjectRepository(WarehouseEntity)
    private readonly warehouseRepository: Repository<WarehouseEntity>
  ) { }

  async create(createWarehouseDto: CreateWarehouseDto): Promise<WarehouseEntity> {
    try {
      const warehouse = await this.warehouseRepository.save(createWarehouseDto)
      if (!warehouse) {
        throw new ManagerError({
          type: 'CONFLICT',
          message: 'Warehouse not created!',
        });
      }
      return warehouse;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }


  async findAll(paginationDto: PaginationDto): Promise<AllApiResponse<WarehouseEntity>> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      // const total = await this.categoryRepository.count({ where: { isActive: true } });
      // const data = await this.categoryRepository.find({ where: { isActive: true }, take: limit, skip: skip })
      const [total, data] = await Promise.all([
        this.warehouseRepository.count({ where: { isActive: true } }),
        this.warehouseRepository.createQueryBuilder('warehouse')
          .where({ isActive: true })
          .leftJoinAndSelect('warehouse.stocks', 'stocks')
          .take(limit)
          .skip(skip)
          .getMany()
      ]);
      const lastPage = Math.ceil(total / limit);

      if (!data) {
        new ManagerError({
          type: "NOT_FOUND",
          message: "No hay warehouses"
        })
      }

      return {
        meta: {
          page,
          limit,
          lastPage,
          total,
        },
        data
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findOne(id: string): Promise<WarehouseEntity> {
    try {
      const warehouse = await this.warehouseRepository.createQueryBuilder('warehouse')
        .where({ id, isActive: true })
        .leftJoinAndSelect('warehouse.stock', 'stock')
        .getOne()

      if (!warehouse) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Warehouse not found',
        });
      }

      return warehouse;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async update(id: string, updateWarehouseDto: UpdateWarehouseDto): Promise<UpdateResult> {
    try {
      const warehouse = await this.warehouseRepository.update(id, updateWarehouseDto)
      if (warehouse.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Warehouse not found',
        });
      }

      return warehouse;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async remove(id: string): Promise<UpdateResult> {
    try {
      const warehouse = await this.warehouseRepository.update({ id }, { isActive: false })
      if (warehouse.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Warehouse not found',
        });
      }

      return warehouse;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}
