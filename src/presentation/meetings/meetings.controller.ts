import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateMeetingDto } from 'src/components/meeting/dto/create-meeting.dto';
import { UpdateMeetingDto } from 'src/components/meeting/dto/update-meeting.dto';
import { MeetingService } from 'src/components/meeting/meeting.service';

@Controller('api/v1/meetings')
export class MeetingsController {
  constructor(private readonly meetingService: MeetingService) {}

  @Get()
  async index(): Promise<any> {
    return this.meetingService.findAll();
  }

  @Post()
  async create(@Body() data: CreateMeetingDto): Promise<any> {
    return this.meetingService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateMeetingDto) {
    return this.meetingService.update(id, data);
  }
}
