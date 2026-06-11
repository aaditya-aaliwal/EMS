export class CreateEmployeeDto {
  user_id: number;
  employee_code: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  designation: string;
  department_id: number;
  joining_date: Date;
  status: string;
}