import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Organization } from './organization.entity';

@Entity()
export class Resource {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('jsonb')
  data: Record<string, any>;

  @Column({ nullable: true })
  providerId: string;

  @ManyToOne(() => Organization)
  organization: Organization;
}
