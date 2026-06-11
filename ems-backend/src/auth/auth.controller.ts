import { Controller, Post, Body, Put } from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() body: any) {
    return this.authService.login(
      body.email,
      body.password,
    );
  }

  @Put('change-password')
  changePassword(@Body() body: any) {
    return this.authService.changePassword(
      body.userId,
      body.currentPassword,
      body.newPassword,
    );
  }

}