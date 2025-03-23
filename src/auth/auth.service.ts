import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) throw new UnauthorizedException('Credenciais inválidas!');

    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (!isPasswordMatching)
      throw new UnauthorizedException('Credenciais inválidas!');

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);

    const payload = { sub: user.id, email: user.email, isAdmin: user.isAdmin };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: `${process.env.JWT_SECRET}`,
      }),
      user,
    };
  }
}
