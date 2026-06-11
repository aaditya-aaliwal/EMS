import { Controller, Get, Post, Body } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { Param } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { Delete } from '@nestjs/common';

import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';



@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Get()
  findAll() {
    return this.departmentsService.findAll();
  }

  @Post()
  create(@Body() body: any) {
    return this.departmentsService.create(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentsService.findOne(+id);
  }

  @Put(':id')
  update(
  @Param('id') id: string,
  @Body() body: any,
  ) {
    return this.departmentsService.update(+id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.departmentsService.delete(+id);
  }
}