import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingEntity } from './meeting.entity';
import { MeetingService } from './meeting.service';

@Module({
  imports: [TypeOrmModule.forFeature([MeetingEntity])],
  controllers: [],
  providers: [MeetingService],
  exports: [MeetingService],
})
export class MeetingModule {}
