import { Injectable } from "@nestjs/common";

import { CreateSupplierDto } from "./dto/create-supplier.dto";
import { UpdateSupplierDto } from "./dto/update-supplier.dto";
import { SupplierEntity } from "./entities/supplier.entity";
import { ManagerError } from "@/common/errors/manager.error";
import { PaginationDto } from '@/common/dtos/pagination/pagination.dto';
import { ResponseAllSuppliers } from "./interfaces/response-suppliers.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { AllApiResponse } from "@/common/interfaces/response-api.interface";

@Injectable()
export class SuppliersService {

    constructor(
        @InjectRepository(SupplierEntity)
        private readonly supplierRepository: Repository<SupplierEntity>
    ) { }


    async create(createSupplierDto: CreateSupplierDto): Promise<SupplierEntity> {
        try {
            const supplier = await this.supplierRepository.save(createSupplierDto)
            if (!supplier) {
                throw new ManagerError({
                    type: 'CONFLICT',
                    message: 'Supplier not created!',
                });
            }
            return supplier;
        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
    }

    async findAll(paginationDto: PaginationDto): Promise<AllApiResponse<SupplierEntity>> {
        const { limit, page } = paginationDto;
        const skip = (page - 1) * limit;
        try {
            const [total, data] = await Promise.all([
                this.supplierRepository.count({ where: { isActive: true } }),
                this.supplierRepository.createQueryBuilder('supplier')
                  .where({ isActive: true })
                  .leftJoinAndSelect('supplier.products', 'products')
                  .take(limit)
                  .skip(skip)
                  .getMany()
            ])
            const lastPage = Math.ceil(total / limit);

            if (!data) {
                new ManagerError({
                    type: "NOT_FOUND",
                    message: "No hay Suppliers"
                })
            }

            return {
                meta: {
                    page,
                    limit,
                    lastPage,
                    total,
                },
                data,
            };
        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
    }

    async findOne(id: string): Promise<SupplierEntity> {
        try {
            const supplier = await this.supplierRepository.createQueryBuilder('supplier')
            .where({ id, isActive: true })
            .leftJoinAndSelect('supplier.products', 'product')
            .getOne();
            if (!supplier) {
                throw new ManagerError({
                    type: 'NOT_FOUND',
                    message: 'Supplier not found',
                });
            }
            return supplier;
        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
    }

    async update(id: string, updateSupplierDto: UpdateSupplierDto): Promise<UpdateResult> {
        try {
            const supplier = await this.supplierRepository.update(id, updateSupplierDto)
            if (supplier.affected === 0) {
                throw new ManagerError({
                    type: 'NOT_FOUND',
                    message: 'Supplier not found',
                });
            }
            return supplier
        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
    }

    async remove(id: string): Promise<UpdateResult> {
        try {
            const supplier = await this.supplierRepository.update({ id }, { isActive: false })
            if (supplier.affected === 0) {
                throw new ManagerError({
                    type: 'NOT_FOUND',
                    message: 'Supplier not found',
                });
            }

            return supplier
        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
    }
}