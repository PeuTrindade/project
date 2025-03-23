import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from 'src/interface/user/create_user.interface';
import * as bcrypt from 'bcryptjs';
import { AuthUserDTO } from 'src/interface/user/auth_user.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() { email, password }: AuthUserDTO) {
    try {
      if (!email || !password) {
        throw new BadRequestException(
          'Os dados enviados estão incompletos! Tente novamente.',
        );
      }

      const user = await this.userService.findByEmail(email);

      if (!user) {
        throw new UnauthorizedException(
          'Credenciais inváldas! Tente novamente.',
        );
      }

      const isPasswordMatching = await bcrypt.compare(password, user.password);

      if (!isPasswordMatching) {
        throw new UnauthorizedException(
          'Credenciais inváldas! Tente novamente.',
        );
      }

      return { message: 'Usuário logado com sucesso!', user };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof UnauthorizedException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Ocorreu um erro interno! Tente novamente.',
      );
    }
  }

  @Post('register')
  async register(@Body() { email, isAdmin, name, password }: CreateUserDTO) {
    try {
      if (!email || !name || !password) {
        throw new BadRequestException(
          'Os dados enviados estão incompletos! Tente novamente.',
        );
      }

      const isThereUser = await this.userService.findByEmail(email);

      if (isThereUser) {
        throw new BadRequestException('Usuário já cadastrado com este email!');
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
