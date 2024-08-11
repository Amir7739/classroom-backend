import { Controller, Get, Post, Body, Param, Query, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  // Fetch users by role, e.g., /users/role/Student
  @Get('role/:role')
  async findByRole(@Param('role') role: Role) {
    return this.usersService.findByRole(role);
  }

  // Alternatively, you can use a query parameter like /users?role=Student
  @Get('filter')
  async findByRoleQuery(@Query('role') role: Role) {
    return this.usersService.findByRole(role);
  }

  @Get(':id')  // New endpoint to get a user by ID
  async findOne(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }


  @Post('create')
  async create(@Body() createUserDto: any) {
    return this.usersService.create(createUserDto);
  }

  @Put('edit/:id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.usersService.update(id, updateUserDto);
  }

}
