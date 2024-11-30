import { ADMIN_KEY, PUBLIC_KEY, USER_KEY } from '@/common/constants/roles-key.constant';
import { UserRole } from '@/common/enums/user-role.enum';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<Array<keyof typeof UserRole>>(UserRole, context.getHandler());
    const isUser = this.reflector.get<string>(USER_KEY, context.getHandler());
    const isAdmin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());
    const isPublic = this.reflector.get<boolean>(PUBLIC_KEY, context.getHandler());


    const request = context.switchToHttp().getRequest<Request>()
    const user = request["user"];

    if( isPublic ) return true;

    try {
      if (roles === undefined) {
        if ( !isAdmin ) {
          return true;
        }

        if ( (user.role && isAdmin) === user.role ) {
          return true;
        }
        
        throw new UnauthorizedException("Unauthorized");
      }

      const isAuth = roles.some((auth) => auth === user.role);
      if ( !isAuth ) {
        throw new UnauthorizedException("Unauthorized");
      }
    } catch (error) {
      throw new UnauthorizedException("Unauthorized");
    }

    return true;
  }
}
