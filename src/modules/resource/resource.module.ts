import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourceService } from './resource.service';
import { ResourceController } from './resource.controller';
import { Resource } from '../entities/resource.entity';
import { OrganizationModule } from '../organization/organization.module';
import { User } from '../entities/user.entity';
import { Organization } from '../entities/organization.entity';
import { PermissionModule } from '../permission/permission.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Resource, User, Organization, PermissionModule]),
    OrganizationModule,
    PermissionModule,
  ],
  controllers: [ResourceController],
  providers: [ResourceService],
  exports: [ResourceService],
})
export class ResourceModule {}
