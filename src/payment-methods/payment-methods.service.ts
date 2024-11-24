import { Injectable } from '@nestjs/common';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethodEntity } from './entities/payment-method.entity';
import { ManagerError } from '@/common/errors/manager.error';
import { Repository, UpdateResult } from 'typeorm';
import { PaginationDto } from '@/common/dtos/pagination/pagination.dto';
import { AllApiResponse } from '@/common/interfaces/response-api.interface';

@Injectable()
export class PaymentMethodsService {
  constructor(
    @InjectRepository(PaymentMethodEntity)
    private readonly paymentMethodRepository: Repository<PaymentMethodEntity>
  ) { }

  async create(createPaymentMethodDto: CreatePaymentMethodDto): Promise<PaymentMethodEntity> {
    try {
      const paymentMethod = await this.paymentMethodRepository.save(createPaymentMethodDto);
      if (!paymentMethod) {
        throw new ManagerError({
          type: 'CONFLICT',
          message: 'PaymentMethod not created!',
        });
      }
      return paymentMethod;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<AllApiResponse<PaymentMethodEntity>> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      const [total, data] = await Promise.all([
        this.paymentMethodRepository.count({ where: { isActive: true } }),
        this.paymentMethodRepository.createQueryBuilder('payment_method')
          .where({ isActive: true })
          .leftJoinAndSelect('payment_method.purchase', 'purchase')
          .take(limit)
          .skip(skip)
          .getMany()
      ]);
      const lastPage = Math.ceil(total / limit);

      if (!data) {
        new ManagerError({
          type: "NOT_FOUND",
          message: "No hay PaymentMethodos"
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

  async findOne(id: string): Promise<PaymentMethodEntity> {
    try {
      const paymentMethod = await this.paymentMethodRepository.createQueryBuilder('paymentMethod')
        .where({ isActive: true })
        .leftJoinAndSelect('paymentMethod.purchase', 'purchase')
        .getOne()

      if (!paymentMethod) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'PaymentMethod not found',
        });
      }

      return paymentMethod;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async update(id: string, updatePaymentMethodDto: UpdatePaymentMethodDto): Promise<UpdateResult> {
    try {
      const paymentMethod = await this.paymentMethodRepository.update(id, updatePaymentMethodDto)
      if (paymentMethod.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'PaymentMethodo not found',
        });
      }

      return paymentMethod;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async remove(id: string): Promise<UpdateResult> {
    try {
      const paymentMethod = await this.paymentMethodRepository.update({ id }, { isActive: false })
      if (paymentMethod.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'PaymentMethodo not found',
        });
      }

      return paymentMethod;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}
