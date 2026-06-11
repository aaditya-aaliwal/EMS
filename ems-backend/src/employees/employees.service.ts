import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';

import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
    constructor(
        @InjectRepository(Employee)
        private employeeRepository: Repository<Employee>,
    ) { }

    async create(createEmployeeDto: CreateEmployeeDto) {
        return this.employeeRepository.save(createEmployeeDto);
    }

    async findAll() {
        return this.employeeRepository.find();
    }

    async findOne(id: number) {
        return this.employeeRepository.findOneBy({ id });
    }

    async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
        await this.employeeRepository.update(id, updateEmployeeDto);
        return this.findOne(id);
    }

    async remove(id: number) {
        return this.employeeRepository.delete(id);
    }


    async findByUserId(userId: number) {
        console.log('SERVICE HIT', userId);

        return this.employeeRepository.findOne({
            where: { user_id: userId },
        });
    }
}