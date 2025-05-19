import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Organization } from './organization.entity';
import { User } from './user.entity';

@Entity()
export class Resource {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  data: string;

  @ManyToOne(() => Organization)
  organization: Organization;

  @ManyToOne(() => User)
  user: User;
}
