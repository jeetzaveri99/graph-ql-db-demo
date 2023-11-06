import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { jwtConfig } from '../../config/jwt.config';

import { UserModule } from '../user/user.module';

import { AuthService } from './auth.service';

import { AuthResolver } from './auth.resolver';
import { AuthGuard } from './auth.guard';
import { JwtGuard } from './jwt.auth.guard';

@Module({
  imports: [UserModule, JwtModule.registerAsync(jwtConfig)],
  controllers: [],
  providers: [AuthService, AuthResolver, AuthGuard, JwtGuard],
  exports: [AuthService],
})
export class AuthModule {}
