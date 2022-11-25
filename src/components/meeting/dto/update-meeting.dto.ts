import { IsNotEmpty, ValidateIf } from 'class-validator';
import { StatusEnum } from '../meeting.entity';

export class UpdateMeetingDto {
  @ValidateIf((o) => !o.status && !o.sdp)
  @IsNotEmpty()
  teacherId: string;

  @ValidateIf((o) => !o.teacherId && !o.sdp)
  @IsNotEmpty()
  status: StatusEnum;

  @ValidateIf((o) => !o.teacherId && !o.status)
  @IsNotEmpty()
  sdp: string;
}
