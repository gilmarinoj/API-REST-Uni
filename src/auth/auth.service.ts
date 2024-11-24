import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/users/users.service';
import { ManagerError } from '@/common/errors/manager.error';
import { UserEntity } from '@/users/entities/user.entity';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) { }
  register(registerAuthDto: RegisterAuthDto) {
    return 'This action adds a new auth';
  }

  async login(loginAuthDto: LoginAuthDto): Promise<{
    user: UserEntity,
    token: string;
  }> {
    const { email, password } = loginAuthDto
    try {
      const user = await this.usersService.findOneByEmail(email);
      if (user.password !== password) {
        throw new ManagerError({
          type: "BAD_REQUEST",
          message: "Credenciales no validas"
        });
      }

      const token = await this.jwtService.signAsync({ email: user.email, id: user.id }, {secret: process.env.JWT_SECRET})
      if ( !token ){
        throw new ManagerError({
          type: "INTERNAL_SERVER_ERROR",
          message: "Ocurrio un error interno en el servidor"
        })
      }

      return {user, token};

    } catch (error) {
      ManagerError.createSignatureError(error.message);
    };
  }


}
