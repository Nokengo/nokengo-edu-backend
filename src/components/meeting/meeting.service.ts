import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { MeetingEntity, StatusEnum } from './meeting.entity';

@Injectable()
export class MeetingService {
  constructor(
    @InjectRepository(MeetingEntity)
    private readonly meetingRepository: Repository<MeetingEntity>,
  ) {}

  async findAll(): Promise<MeetingEntity[]> {
    return await this.meetingRepository.find({
      relations: ['student', 'teacher', 'subject'],
    });
  }

  async findOneOrFail(id: string): Promise<MeetingEntity> {
    return await this.meetingRepository.findOneOrFail({
      where: { id },
    });
  }

  async findOneBySubjectId(subjectId: number): Promise<MeetingEntity> {
    return await this.meetingRepository.findOneByOrFail({
      subjectId,
      status: StatusEnum.AVAILABLE,
    });
  }

  async create(data: CreateMeetingDto): Promise<MeetingEntity> {
    const meeting = this.meetingRepository.create(data);
    return await this.meetingRepository.save(meeting);
  }

  async update(id: string, data: UpdateMeetingDto): Promise<MeetingEntity> {
    await this.meetingRepository.update(id, data);
    return await this.findOneOrFail(id);
  }

  async updateBySocketId(
    socketId: string,
    data: { status: StatusEnum },
  ): Promise<MeetingEntity> {
    const meeting = await this.meetingRepository.findOneByOrFail({
      sdp: socketId,
    });

    await this.meetingRepository.update(meeting.id, {
      status: data.status,
    });

    return await this.findOneOrFail(meeting.id);
  }
}
