import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Leave } from './leave.entity';
import { Employee } from '../employees/entities/employee.entity';

@Injectable()
export class LeavesService {
  constructor(
    @InjectRepository(Leave)
    private leaveRepository: Repository<Leave>,

    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async applyLeave(data: any) {
    const leave = this.leaveRepository.create({
      employee_id: data.employee_id,
      leave_type: data.leave_type,
      start_date: data.start_date,
      end_date: data.end_date,
      reason: data.reason,
      status: 'Pending',
    });

    return this.leaveRepository.save(leave);
  }

  async getAllLeaves() {
  return this.leaveRepository.find({
    relations: {
  employee: true,
},
    order: {
      created_at: 'DESC',
    },
  });
}


  async getEmployeeLeaves(employeeId: number) {
    return this.leaveRepository.find({
      where: {
        employee_id: employeeId,
      },
      order: {
        created_at: 'DESC',
      },
    });
  }

  async updateLeaveStatus(
    leaveId: number,
    status: string,
    approvedBy: number,
  ) {
    await this.leaveRepository.update(
      leaveId,
      {
        status,
        approved_by: approvedBy,
        approved_at: new Date(),
      },
    );

    return this.leaveRepository.findOne({
      where: {
        id: leaveId,
      },
    });
  }
}