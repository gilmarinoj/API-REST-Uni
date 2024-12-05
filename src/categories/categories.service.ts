import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { ManagerError } from '@/common/errors/manager.error';
import { PaginationDto } from '@/common/dtos/pagination/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { AllApiResponse, ResponseApi } from '@/common/interfaces/response-api.interface';

@Injectable()
export class CategoriesService {


  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) { }

  async create(createCategoryDto: CreateCategoryDto): Promise<ResponseApi<CategoryEntity>> {
    try {
      const category = await this.categoryRepository.save(createCategoryDto);
      if (!category) {
        throw new ManagerError({
          type: 'CONFLICT',
          message: 'Category not created!',
        });
      }
      return {
        status: {
          statusMsg: 'ACCEPTED',
          statusCode: 200,
          error: null
        },
        data: category
      }
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<AllApiResponse<CategoryEntity>> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      // const total = await this.categoryRepository.count({ where: { isActive: true } });
      // const data = await this.categoryRepository.find({ where: { isActive: true }, take: limit, skip: skip })
      const [total, data] = await Promise.all([
        this.categoryRepository.count({ where: { isActive: true } }),
        this.categoryRepository.createQueryBuilder('category')
          .where({ isActive: true })
          .leftJoinAndSelect('category.products', 'products')
          .take(limit)
          .skip(skip)
          .getMany()
      ])
      const lastPage = Math.ceil(total / limit);

      if (!data) {
        new ManagerError({
          type: "NOT_FOUND",
          message: "No hay Categorias"
        })
      }

      return {
        meta: {
          page,
          lastPage,
          limit,
          total
        },
        data
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findOne(id: string): Promise<ResponseApi<CategoryEntity>> {
    try {
      const category = await this.categoryRepository.createQueryBuilder('category')
        .where({ id, isActive: true })
        .leftJoinAndSelect('category.products', 'product')
        .getOne();

      if (!category) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Category not found',
        });
      }

      return {
        status: {
          statusMsg: 'ACCEPTED',
          statusCode: 200,
          error: null
        },
        data: category
      }
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<UpdateResult> {
    try {
      const category = await this.categoryRepository.update(id, updateCategoryDto)
      if (category.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Category not found',
        });
      }

      return category;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async remove(id: string): Promise<UpdateResult> {
    try {
      const category = await this.categoryRepository.update({ id }, { isActive: false })
      if (category.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Category not found',
        });
      }

      return category;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}
