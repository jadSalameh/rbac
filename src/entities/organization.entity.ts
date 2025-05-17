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
  facilityCode: string;

  @Column({
    type: 'enum',
    enum: [
      'VA_MEDICAL_CENTER',
      'VA_OUTPATIENT_CLINIC',
      'VA_COMMUNITY_CARE',
      'VA_REGIONAL_OFFICE',
    ],
  })
  type: string;

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
