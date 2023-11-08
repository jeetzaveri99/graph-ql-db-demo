import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from './entity/user.entity';
import { RegistrationArgs } from '../auth/args/registration.args';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    public readonly userRepo: Repository<UserEntity>,
  ) {}

  async findUserByEmail(email: string) {
    return await this.userRepo.findOne({ where: { email } });
  }

  async create(registrationArgs: RegistrationArgs): Promise<UserEntity> {
    const user: UserEntity = new UserEntity();
    user.name = registrationArgs.name;
    user.email = registrationArgs.email;
    user.password = registrationArgs.password;

    return await this.userRepo.save(user);
  }
}
