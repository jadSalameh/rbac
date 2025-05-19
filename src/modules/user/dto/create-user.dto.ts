import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/auth/auth/role.enum';
import { IsUUID } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'The first name of the user', example: 'John' })
  firstName: string;

  @ApiProperty({ description: 'The last name of the user', example: 'Doe' })
  lastName: string;

  @ApiProperty({
    description: 'The password for the user',
    example: 'securepassword123',
  })
  password: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The Role',
    example: 'one of the following roles(OWNER, ADMIN, VIEWER)',
  })
  role: Role;

  @ApiProperty({
    description: 'The ID of the organization the user belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  organizationId: string;
}
