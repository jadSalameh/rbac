import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { Role } from '../../../auth/auth/role.enum';

export class CreatePermissionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsNotEmpty()
  roles: Role[];
}
