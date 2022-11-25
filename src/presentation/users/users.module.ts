import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/components/user/user.module';
import { UserService } from 'src/components/user/user.service';
import { UsersController } from './users.controller';

@Module({
  imports: [UserModule],
  controllers: [UsersController],
  providers: [],
  exports: [],
})
export class UsersModule {}
