import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'subjects' })
export class SubjectEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  name: string;
}
