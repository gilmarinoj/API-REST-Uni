import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserGender } from 'src/common/enums/user-gender.enum';
import { UserRole } from 'src/common/enums/user-role.enum';
import { PaginationDto } from 'src/common/dtos/pagination/pagination.dto';
import { ManagerError } from 'src/common/errors/manager.error';
import { ResponseAllUsers } from './interfaces/response-users.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        try {
            const user = await this.userRepository.save(createUserDto);
            if (!user) {
                throw new ManagerError({
                    type: 'CONFLICT',
                    message: 'User not created!',
                });
            }
            return user;
        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
    }

    async findAll(paginationDto: PaginationDto): Promise<ResponseAllUsers> {
        const { limit, page } = paginationDto;
        const skip = (page - 1) * limit;

        try {
            // const total = await this.categoryRepository.count({ where: { isActive: true } });
            // const data = await this.categoryRepository.find({ where: { isActive: true }, take: limit, skip: skip })
            const [total, data] = await Promise.all([
                this.userRepository.count({ where: { isActive: true } }),
                this.userRepository.find({ where: { isActive: true }, take: limit, skip: skip })
            ])
            const lastPage = Math.ceil(total / limit);

            if(!data){
                new ManagerError({
                    type: "NOT_FOUND",
                    message: "No hay Usuarios"
                })
            } 

            return {
                page,
                limit,
                lastPage,
                total,
                data,
            };
        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
    }

    async findOne(id: string): Promise<UserEntity> {
        try {
            const user = await this.userRepository.findOne({ where: { id: id } })
            if (!user) {
                throw new ManagerError({
                    type: 'NOT_FOUND',
                    message: 'User not found',
                });
            }

            return user;
        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
        try {
            const user = await this.userRepository.update(id, updateUserDto)
            if (user.affected === 0) {
                throw new ManagerError({
                    type: 'NOT_FOUND',
                    message: 'User not found',
                });
            }

            return user;
        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
    }

    async remove(id: string): Promise<UpdateResult> {
        try {
            const user = await this.userRepository.update({ id }, { isActive: false })
            if (user.affected === 0) {
                throw new ManagerError({
                    type: 'NOT_FOUND',
                    message: 'User not found',
                });
            }

            return user;
        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
    }
}
