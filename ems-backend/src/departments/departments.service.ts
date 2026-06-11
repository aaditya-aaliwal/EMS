import { Injectable , BadRequestException,} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Department } from './entities/department.entity';



@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  findAll() {
    return this.departmentRepository.find();
  }

  findOne(id: number) {
  return this.departmentRepository.findOne({
    where: { id },
  });
  }

  create(department: Partial<Department>) {
  return this.departmentRepository.save(department);
  }

  async update(id: number, data: any) {
  await this.departmentRepository.update(id, data);

  return this.departmentRepository.findOne({
    where: { id },
    });
  }

  async delete(id: number) {
  try {
    return await this.departmentRepository.delete(id);
  } catch (error) {
    throw new BadRequestException(
      'Cannot delete department. Employees are assigned to this department.'
    );
  }
}
}