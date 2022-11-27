import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateMeetingDto } from 'src/components/meeting/dto/create-meeting.dto';
import { UpdateMeetingDto } from 'src/components/meeting/dto/update-meeting.dto';
import { StatusEnum } from 'src/components/meeting/meeting.entity';
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

  @Get('/subject/:subjectId')
  async show(@Param('subjectId') subjectId: number): Promise<any> {
    return this.meetingService.findOneBySubjectId(subjectId);
  }

  @Put('/deactivate/:id')
  async updateBySocketId(@Param('socketId') socketId: string) {
    return this.meetingService.updateBySocketId(socketId, {
      status: StatusEnum.CLOSED,
    });
  }
}
