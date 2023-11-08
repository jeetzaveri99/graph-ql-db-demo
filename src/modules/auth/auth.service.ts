import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';

import { UserEntity } from '../user/entity/user.entity';

import { RegistrationArgs } from './args/registration.args';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findUserByEmail(username);

    if (user && bcrypt.compareSync(password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserEntity) {
    return {
      access_token: this.jwtService.sign({
        name: user.name,
        email: user.email,
        role: user.role,
        id: user.id,
      }),
    };
  }

  async register(registrationArgs: RegistrationArgs) {
    const user: UserEntity = await this.userService.findUserByEmail(
      registrationArgs.email,
    );

    if (user) throw new Error('User is already exists with given email.');

    await this.userService.create(registrationArgs);

    return 'User registered successfully.';
  }
}
