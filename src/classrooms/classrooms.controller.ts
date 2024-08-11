import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('classrooms')
export class ClassroomsController {
  constructor(private classroomsService: ClassroomsService) { }

  @Get('get')
  async findAll() {
    return this.classroomsService.findAll();
  }

  @Post()
  @Roles(Role.Principal)
  async create(@Body() createClassroomDto: any) {
    return this.classroomsService.create(createClassroomDto);
  }

  @Put(':classroomId/teacher/:teacherId')
  @Roles(Role.Principal)
  async assignTeacher(
    @Param('classroomId') classroomId: string,
    @Param('teacherId') teacherId: string,
  ) {
    return this.classroomsService.assignTeacher(classroomId, teacherId);
  }

  @Put(':classroomId/student/:studentId')
  @Roles(Role.Principal, Role.Teacher)
  async assignStudent(
    @Param('classroomId') classroomId: string,
    @Param('studentId') studentId: string,
  ) {
    return this.classroomsService.assignStudent(classroomId, studentId);
  }
}
