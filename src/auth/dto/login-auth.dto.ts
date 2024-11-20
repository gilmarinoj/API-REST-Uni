import { IsEmail, IsNotEmpty, IsString, Min } from "class-validator";


export class LoginAuthDto{

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
