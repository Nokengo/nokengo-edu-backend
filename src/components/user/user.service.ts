import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find({
      relations: ['group', 'subject'],
    });
  }

  async findOneOrFail(
    conditions: FindOptionsWhere<UserEntity>,
  ): Promise<UserEntity> {
    try {
      return await this.usersRepository.findOneOrFail({
        where: conditions,
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(data: CreateUserDto): Promise<UserEntity> {
    try {
      const user = this.usersRepository.create(data);
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.findOneOrFail({ id });
    this.usersRepository.merge(user, data);
    return await this.usersRepository.save(user);
  }

  async destroy(id: string) {
    await this.usersRepository.findOneOrFail({ where: { id } });
    this.usersRepository.softDelete({ id });
  }
}
