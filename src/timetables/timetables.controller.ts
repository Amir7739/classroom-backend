// src/timetables/timetables.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TimetablesService } from './timetables.service';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('timetables')
export class TimetablesController {
  constructor(private timetablesService: TimetablesService) { }

  @Get()
  async findAll() {
    return this.timetablesService.findAll();
  }

  @Get('classroom/:classroomId')
  async findByClassroom(@Param('classroomId') classroomId: string) {
    return this.timetablesService.findByClassroom(classroomId);
  }

  @Post()
  @Roles(Role.Teacher)
  async create(@Body() createTimetableDto: any) {
    return this.timetablesService.create(createTimetableDto);
  }

  @Put(':id')
  @Roles(Role.Teacher)
  async update(@Param('id') id: string, @Body() updateTimetableDto: any) {
    return this.timetablesService.update(id, updateTimetableDto);
  }

  @Delete(':id')
  @Roles(Role.Teacher)
  async delete(@Param('id') id: string) {
    return this.timetablesService.delete(id);
  }
}
