import { Module } from '@nestjs/common';
import { MeetingModule } from 'src/components/meeting/meeting.module';

import { MyGateway } from './gateway';

@Module({
  imports: [MeetingModule],
  providers: [MyGateway],
})
export class GatewayModule {}
