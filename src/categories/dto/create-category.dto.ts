import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    category_name: string;

    @IsString()
    @IsOptional()
    description?: string;
}
