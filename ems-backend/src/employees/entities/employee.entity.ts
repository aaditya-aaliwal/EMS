import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ length: 20 })
  employee_code: string;

  @Column({ length: 50 })
  first_name: string;

  @Column({ length: 50 })
  last_name: string;

  @Column({ length: 150 })
  email: string;

  @Column({ length: 15 })
  phone: string;

  @Column({ length: 100 })
  designation: string;

  @Column()
  department_id: number;

  @Column({ type: 'date' })
  joining_date: Date;

  @Column({ length: 20 })
  status: string;

  @CreateDateColumn()
  created_at: Date;
}