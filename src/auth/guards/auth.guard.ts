import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '@/common/enums/user-role.enum';
import { UsersService } from '../../users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ){}
  
  async canActivate( context: ExecutionContext ): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader( request );
    if ( !token ) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync<{id:string, email:string, role: UserRole}>(
        token,
        {
          secret: process.env.JWT_SECRET,
        }
      );
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      const user = await this.usersService.findOne(payload.id);

      request['user'] = { id: user.id, role: user.role, email: user.email, };
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader( request: Request ): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return (type === 'Bearer') ? token : undefined;
  }
}
