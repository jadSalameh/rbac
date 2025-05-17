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

  @Column({
    type: 'enum',
    enum: [
      'MEDICAL_RECORD',
      'PRESCRIPTION',
      'APPOINTMENT',
      'LAB_RESULT',
      'IMAGING_RESULT',
      'MENTAL_HEALTH_RECORD',
      'DISABILITY_CLAIM',
      'BENEFIT_CLAIM',
    ],
  })
  type: string;

  @Column('jsonb')
  data: Record<string, any>;

  @Column({ nullable: true })
  veteranId: string;

  @Column({ nullable: true })
  providerId: string;

  @Column({
    type: 'enum',
    enum: ['ACTIVE', 'ARCHIVED', 'PENDING_REVIEW', 'APPROVED', 'REJECTED'],
    default: 'ACTIVE',
  })
  status: string;

  @Column({ type: 'timestamp', nullable: true })
  lastAccessedAt: Date;

  @ManyToOne(() => Organization)
  organization: Organization;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
