import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import * as bcrypt from 'bcryptjs';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(
    @Body() { email, password }: { email: string; password: string },
  ) {
    try {
      return this.authService.login(email, password);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Ocorreu um erro interno! Tente novamente.',
      );
    }
  }

  @Post('register')
  async register(@Body() { email, isAdmin, name, password }: any) {
    try {
      if (!email || !name || !password) {
        throw new BadRequestException('Dados incompletos! Tente novamente.');
      }

      const isThereUser = await this.userService.findByEmail(email);

      if (isThereUser) {
        throw new BadRequestException('Email já cadastrado! Tente novamente.');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.userService.create({
        email,
        password: hashedPassword,
        name,
        isAdmin: isAdmin ?? false,
      });

      return { message: 'Usuário criado com sucesso!', user };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Ocorreu um erro interno! Tente novamente.',
      );
    }
  }
}
