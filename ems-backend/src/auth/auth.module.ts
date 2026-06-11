import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';

import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { EmployeesModule } from '../employees/employees.module';


@Module({
  imports: [
    UsersModule,
    EmployeesModule,
    PassportModule,

    JwtModule.register({
      secret: 'ems-secret-key',
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,],
})
export class AuthModule {}