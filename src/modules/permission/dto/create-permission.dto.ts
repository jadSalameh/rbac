import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { Role } from '../../../auth/auth/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto {
 @ApiProperty({ description: 'The name of the permission', example: 'read:resource' })
  @IsString()
  @IsNotEmpty()
  name: string;

 @ApiProperty({ description: 'A description of the permission', example: 'Allows reading of resources' })
  @IsString()
  @IsNotEmpty()
  description: string;

 @ApiProperty({
    description: 'The roles associated with this permission',
    type: [String],
    example: [Role.ADMIN, Role.VIEWER],
  })
  @IsArray()
  @IsNotEmpty()
  roles: Role[];
}
