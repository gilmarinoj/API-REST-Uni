import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { UserGender } from "src/common/enums/user-gender.enum";
import { UserRole } from "src/common/enums/user-role.enum";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEnum(UserGender)
    gender: UserGender;
    
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNumber()
    @IsNotEmpty()
    age: number;

    @IsString()
    @IsOptional()
    photo?: string;
}
