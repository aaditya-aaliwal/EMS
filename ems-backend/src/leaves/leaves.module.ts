import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Leave } from './leave.entity';
import { Employee } from '../employees/entities/employee.entity';

import { LeavesController } from './leaves.controller';
import { LeavesService } from './leaves.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Leave,
      Employee,
    ]),
  ],
  controllers: [LeavesController],
  providers: [LeavesService],
})
export class LeavesModule {}