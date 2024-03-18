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

  validateUser(mobilenumber: string) {
    const user = this.userService.findOneByMobile(mobilenumber);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
