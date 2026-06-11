import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Employee } from '../employees/entities/employee.entity';

@Entity('leave_requests')
export class Leave {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  leave_type: string;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date' })
  end_date: Date;

  @Column('text')
  reason: string;

  @Column({
    default: 'Pending',
  })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({
    nullable: true,
  })
  approved_by: number;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  approved_at: Date;

  @Column()
  employee_id: number;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}