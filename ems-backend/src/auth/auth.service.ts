import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeesService } from '../employees/employees.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private employeesService: EmployeesService,
        private jwtService: JwtService,
    ) { }

    async register(registerDto: RegisterDto) {
        const hashedPassword = await bcrypt.hash(
            registerDto.password,
            10,
        );

        return this.usersService.create({
            username: registerDto.username,
            email: registerDto.email,
            password: hashedPassword,
            role_id: registerDto.role_id,
        });
    }

    async login(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password,
        );

        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            sub: user.id,
            email: user.email,
            role_id: user.role_id,
        };



        const employee =
            await this.employeesService.findByUserId(user.id);

        console.log("USER ID:", user.id);
        console.log("EMPLOYEE:", employee);

        return {
            access_token: this.jwtService.sign(payload),
            userId: user.id,
            employeeId: employee?.id,
            roleId: user.role_id,
            email: user.email,
        };
    }

    async changePassword(
        userId: number,
        currentPassword: string,
        newPassword: string,
    ) {
        const user =
            await this.usersService.findById(userId);

        if (!user) {
            throw new UnauthorizedException(
                'User not found',
            );
        }

        const isMatch = await bcrypt.compare(
            currentPassword,
            user.password,
        );

        if (!isMatch) {
            throw new UnauthorizedException(
                'Current password is incorrect',
            );
        }

        const hashedPassword =
            await bcrypt.hash(newPassword, 10);

        await this.usersService.updatePassword(
            userId,
            hashedPassword,
        );

        return {
            message:
                'Password updated successfully',
        };
    }
}