import { Query, Resolver } from '@nestjs/graphql';

import { AuthService } from './modules/auth/auth.service';

@Resolver(() => String)
export class AppResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String)
  index(): string {
    return 'NestJs GraphQL Server.';
  }
}
