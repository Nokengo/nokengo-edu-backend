import { Module } from '@nestjs/common';
import { MeetingModule } from 'src/components/meeting/meeting.module';
import { MeetingsController } from './meetings.controller';

@Module({
  imports: [MeetingModule],
  controllers: [MeetingsController],
  providers: [],
  exports: [],
})
export class MeetingsModule {}
