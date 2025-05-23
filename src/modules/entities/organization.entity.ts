import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @ManyToOne(() => Organization, (organization) => organization.children)
  parent: Organization;

  @OneToMany(() => Organization, (organization) => organization.parent)
  children: Organization[];

  @OneToMany(() => User, (user) => user.organization)
  users: User[];
}
