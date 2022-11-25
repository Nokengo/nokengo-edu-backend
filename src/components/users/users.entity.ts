import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import * as bcrypt from 'bcrypt';
import { GroupsEntity } from './groups.entity';
import { Subject } from 'rxjs';
import { SubjectsEntity } from '../subjects/subjects.entity';

@Entity({ name: 'users' })
export class UsersEntity {
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

  @ManyToOne(() => GroupsEntity)
  @JoinColumn()
  group: GroupsEntity;

  @ManyToMany(() => SubjectsEntity)
  @JoinTable({ name: 'users_subjects' })
  subjects: SubjectsEntity[];

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
