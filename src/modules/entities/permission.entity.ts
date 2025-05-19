import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Role } from 'src/shared/enum/role.enum';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('simple-array')
  roles: Role[];

  @Column({ nullable: true })
  description: string;
}
