import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/shared/enum/role.enum';

export class UpdateUserRoleDto {
  @ApiProperty({
    description: 'The new Role for the user',
    example: 'ADMIN',
  })
  role: Role;
}
