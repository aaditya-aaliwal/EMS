import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from './entities/attendance.entity';
import { BadRequestException } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { Employee } from '../employees/entities/employee.entity';


@Injectable()
export class AttendanceService {
    constructor(
        @InjectRepository(Attendance)
        private attendanceRepository: Repository<Attendance>,

        @InjectRepository(Employee)
        private employeeRepository: Repository<Employee>,

    ) { }

    async getAllAttendance() {
        const attendance =
            await this.attendanceRepository.find({
                order: {
                    attendance_date: 'DESC',
                },
            });

        const employees =
            await this.employeeRepository.find();

        return attendance.map((record) => {
            const employee = employees.find(
                (emp) => emp.id === record.employee_id,
            );

            return {
                ...record,
                employee_name: employee
                    ? `${employee.first_name} ${employee.last_name}`
                    : 'Unknown',

                employee_code: employee?.employee_code,
            };
        });
    }

    async markAttendance(createAttendanceDto: CreateAttendanceDto) {
        const today = new Date().toISOString().split('T')[0];

        const existingAttendance = await this.attendanceRepository.findOne({
            where: {
                employee_id: createAttendanceDto.employee_id,
                attendance_date: today as any,
            },
        });

        if (existingAttendance) {
            throw new BadRequestException(
                'Attendance already marked today',
            );
        }

        const attendance = this.attendanceRepository.create({
            employee_id: createAttendanceDto.employee_id,
            attendance_date: today as any,
            status: createAttendanceDto.status,
        });

        return this.attendanceRepository.save(attendance);
    }

    async getEmployeeAttendance(employeeId: number) {
        return this.attendanceRepository.find({
            where: {
                employee_id: employeeId,
            },
            order: {
                attendance_date: 'DESC',
            },
        });
    }

    async getAttendanceReport(employeeId: number) {
        const attendance = await this.attendanceRepository.find({
            where: {
                employee_id: employeeId,
            },
        });

        const present = attendance.filter(
            (record) => record.status === 'Present',
        ).length;

        const workingDays = attendance.length;

        const absent = workingDays - present;

        const percentage =
            workingDays > 0
                ? Number(
                    ((present / workingDays) * 100).toFixed(2),
                )
                : 0;

        return {
            workingDays,
            present,
            absent,
            percentage,
        };
    }
}