import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
} from '@nestjs/common';

import { LeavesService } from './leaves.service';

@Controller('leaves')
export class LeavesController {
  constructor(
    private readonly leavesService: LeavesService,
  ) {}

  @Post()
  applyLeave(@Body() body: any) {
    return this.leavesService.applyLeave(body);
  }

  @Get()
  getAllLeaves() {
    return this.leavesService.getAllLeaves();
  }

  @Get('employee/:id')
  getEmployeeLeaves(
    @Param('id') id: string,
  ) {
    return this.leavesService.getEmployeeLeaves(
      +id,
    );
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.leavesService.updateLeaveStatus(
      +id,
      body.status,
      body.approved_by,
    );
  }
}