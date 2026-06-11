import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('attendance')
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  employee_id: number;

  @Column({ type: 'date' })
  attendance_date: Date;

  @Column({ length: 20 })
  status: string;

  @CreateDateColumn()
  created_at: Date;
}