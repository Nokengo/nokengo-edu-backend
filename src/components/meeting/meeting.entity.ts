import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubjectsEntity } from '../subjects/subjects.entity';
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

  @Column()
  studentId: string;

  @Column()
  subjectId: number;

  @Column()
  teacherId: string;

  @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.AVAILABLE })
  status: StatusEnum;

  @Column({ nullable: true })
  sdp?: string | null;

  @ManyToOne(() => SubjectsEntity)
  @JoinColumn()
  subject: SubjectsEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  student: UserEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  teacher: UserEntity;
}
