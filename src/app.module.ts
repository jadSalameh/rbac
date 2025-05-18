import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { PermissionModule } from './modules/permission/permission.module';
import { ResourceModule } from './modules/resource/resource.module';
import { User } from './modules/entities/user.entity';
import { Organization } from './modules/entities/organization.entity';
import { Permission } from './modules/entities/permission.entity';
import { Resource } from './modules/entities/resource.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Organization, Permission, Resource],
      synchronize: true,
    }),
    UserModule,
    OrganizationModule,
    PermissionModule,
    ResourceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
