import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  generateTokens(user: User) {
    const payload = { sub: user.id, mobile: user.mobile };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  validateUser(mobilenumber: string, name?: string) {
    if (!name) {
      return this.userService.findUserByMobile(mobilenumber);
    }
    const existingUser: User = new User(name, mobilenumber);
    const user = this.userService.findOrCreate(existingUser);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  validateUserByMobile(mobile: string) {
    return this.userService.findUserByMobile(mobile);
  }
}
