import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserEntity } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    const { email, password } = ctx.req.body.variables;

    const user: UserEntity = await this.userService.findUserByEmail(email);
    if (user) {
      if (!bcrypt.compareSync(password, user.password))
        throw new UnauthorizedException();

      ctx.user = user;
      delete ctx.user.password;
      return true;
    }

    throw new UnauthorizedException();
  }
}
