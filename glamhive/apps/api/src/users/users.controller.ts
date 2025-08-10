import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  list() {
    return this.usersService.listUsers();
  }

  @Post()
  create(@Body() body: { fullName: string; email?: string; phone?: string }) {
    return this.usersService.createUser(body);
  }
}