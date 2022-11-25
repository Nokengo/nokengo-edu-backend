import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async index(): Promise<any> {
    return this.usersService.findAll();
  }

  @Post()
  async create(@Body() data: CreateUserDto): Promise<any> {
    return this.usersService.store(data);
  }

  @Get(':id')
  async read(@Param('id') id: number): Promise<any> {
    return this.usersService.findOneOrFail(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: UpdateUserDto,
  ): Promise<any> {
    return await this.usersService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    return await this.usersService.destroy(id);
  }
}
