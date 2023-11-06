import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  generateToken(user: any) {
    return this.jwtService.sign({
      name: user.name,
      email: user.email,
      role: user.role,
      id: user.id,
    });
    // return {
    //   access_token: this.jwtService.sign({
    //     name: user.name,
    //     sub: user.id,
    //   }),
    // };
  }
}
