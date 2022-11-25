import { IsNotEmpty } from 'class-validator';
import { StatusEnum } from '../meeting.entity';

export class CreateMeetingDto {
  @IsNotEmpty()
  studentId: string;

  @IsNotEmpty()
  subjectId: number;

  @IsNotEmpty()
  status: StatusEnum;
}
