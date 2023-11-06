import { UseGuards } from '@nestjs/common';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';

import { AuthGuard } from './auth.guard';

import { UserEntity } from '../user/entity/user.entity';

import { AuthService } from '../auth/auth.service';
import { JwtGuard } from './jwt.auth.guard';

@Resolver(() => String)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // create Login schema and return object instead of string of token
  @Query(() => String)
  @UseGuards(AuthGuard)
  login(
    @Args({ name: 'email', type: () => String }) email: string,
    @Args({ name: 'password', type: () => String }) password: string,
    @Context('user') user: UserEntity,
  ) {
    return this.authService.generateToken(user);
  }

  @Query(() => String)
  @UseGuards(JwtGuard)
  secured(): string {
    return 'THis is secured NestJs GraphQL Server.';
  }
}
