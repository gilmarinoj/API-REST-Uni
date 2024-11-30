import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/users/users.service';
import { ManagerError } from '@/common/errors/manager.error';
import { UserEntity } from '@/users/entities/user.entity';

type AuthType = {
    user: UserEntity,
    token: string;
}

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) { }
  async register(registerAuthDto: RegisterAuthDto): Promise<AuthType> {
    try {

      const user = await this.usersService.create( registerAuthDto );
      const token = await this.jwtService.signAsync({ email: user.email, id: user.id, role: user.role }, {secret: process.env.JWT_SECRET})
      
      if ( !token ){
        throw new ManagerError({
          type: "INTERNAL_SERVER_ERROR",
          message: "Ocurrio un error interno en el servidor"
        })
      }

      return {user, token};
    } catch (error) {
      ManagerError.createSignatureError(error.message)
    }
  }

  async login(loginAuthDto: LoginAuthDto): Promise<AuthType> {
    const { email, password } = loginAuthDto
    try {
      const user = await this.usersService.findOneByEmail(email);
      if (user.password !== password) {
        throw new ManagerError({
          type: "BAD_REQUEST",
          message: "Credenciales no validas"
        });
      }

      const token = await this.jwtService.signAsync({ email: user.email, id: user.id, role: user.role }, {secret: process.env.JWT_SECRET})
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

  async refreshToken( token:string ): Promise<string>{
    try {

      // const [type, token] = token.split

      const payload = await this.jwtService.verifyAsync( token, {secret: process.env.JWT_SECRET} );
      if( !payload ){
        throw new ManagerError({type: "BAD_REQUEST", message: "Token not provider"});
      }

      const newToken = await this.jwtService.signAsync( payload, { secret: process.env.JWT_SECRET } )

      if( !newToken ){
        throw new ManagerError({type: "INTERNAL_SERVER_ERROR", message: "YUJUU"});
      }

      return newToken;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

}
