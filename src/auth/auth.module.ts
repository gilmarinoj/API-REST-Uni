import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from '@/users/users.module';
import { UsersService } from '@/users/users.service';
import { RolesGuard } from './guards/roles.guard';
import { AuthGuard } from './guards/auth.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService, UsersService, AuthGuard, RolesGuard],
  imports: [UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  exports: [
    AuthService, JwtService, RolesGuard, AuthGuard,
  ]
})
export class AuthModule { }
