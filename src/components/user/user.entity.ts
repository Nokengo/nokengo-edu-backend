import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import * as bcrypt from 'bcrypt';
import { GroupEntity } from '../group/group.entity';
import { SubjectEntity } from '../subject/subject.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: string;

  @Column()
  groupId: number;

  @ManyToOne(() => GroupEntity)
  @JoinColumn()
  group: GroupEntity;

  @Column({ nullable: true })
  subjectId?: number;

  @ManyToOne(() => SubjectEntity)
  @JoinColumn()
  subject: SubjectEntity;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;

  private tempPassword: string;

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  @AfterLoad()
  private loadTempPassword(): void {
    this.tempPassword = this.password;
  }

  @BeforeUpdate()
  updatePassword() {
    if (this.password && this.tempPassword !== this.password) {
      this.password = bcrypt.hashSync(this.password, 8);
    }
  }
}
