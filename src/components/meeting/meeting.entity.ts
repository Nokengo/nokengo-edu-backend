import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubjectEntity } from '../subject/subject.entity';
import { UserEntity } from '../user/user.entity';

export enum StatusEnum {
  AVAILABLE = 'available',
  WORKING = 'working',
  CLOSED = 'closed',
}

@Entity({ name: 'meetings' })
export class MeetingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  studentId?: string;

  @Column({ nullable: true })
  subjectId?: number;

  @Column({ nullable: true })
  teacherId?: string;

  @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.AVAILABLE })
  status: StatusEnum;

  @Column({ nullable: true })
  sdp?: string | null;

  @ManyToOne(() => SubjectEntity)
  @JoinColumn()
  subject: SubjectEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  student: UserEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  teacher: UserEntity;
}
