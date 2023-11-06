import { Resolver, Args, Mutation } from '@nestjs/graphql';

import { User } from './schema/user.schema';

import { UserService } from './user.service';

import { RegistrationArgs } from './args/registration.args';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => String, { name: 'register' })
  async register(@Args('registrationArgs') registrationArgs: RegistrationArgs) {
    return await this.userService.register(registrationArgs);
  }
}
