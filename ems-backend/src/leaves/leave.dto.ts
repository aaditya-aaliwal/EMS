export class CreateLeaveDto {
  employee_id: number;
  leave_type: string;
  start_date: Date;
  end_date: Date;
  reason: string;
}