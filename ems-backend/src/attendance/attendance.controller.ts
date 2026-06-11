import {
    Controller,
    Get,
    Post,
    Body,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { Param } from '@nestjs/common';

@Controller('attendance')
export class AttendanceController {
    constructor(
        private readonly attendanceService: AttendanceService,
    ) { }

    @Get()
    getAllAttendance() {
        return this.attendanceService.getAllAttendance();
    }

    @Post('mark')
    markAttendance(
        @Body() createAttendanceDto: CreateAttendanceDto,
    ) {
        return this.attendanceService.markAttendance(
            createAttendanceDto,
        );
    }

    @Get('employee/:employeeId')
    getEmployeeAttendance(
        @Param('employeeId') employeeId: number,
    ) {
        return this.attendanceService.getEmployeeAttendance(
            Number(employeeId),
        );
    }

    @Get('report/:employeeId')
    getAttendanceReport(
        @Param('employeeId') employeeId: number,
    ) {
        return this.attendanceService.getAttendanceReport(
            Number(employeeId),
        );
    }
}