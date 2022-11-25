import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async findAll(): Promise<UsersEntity[]> {
    return await this.usersRepository.find();
  }

  async findOneOrFail(id: number): Promise<UsersEntity> {
    try {
      return await this.usersRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(data: CreateUserDto): Promise<UsersEntity> {
    const user = this.usersRepository.create(data);
    return await this.usersRepository.save(user);
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.findOneOrFail(id);
    this.usersRepository.merge(user, data);
    return await this.usersRepository.save(user);
  }

  async destroy(id: number) {
    await this.usersRepository.findOneOrFail({ where: { id } });
    this.usersRepository.softDelete({ id });
  }
}
