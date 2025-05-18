import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'your email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'securepassword123',
    description: 'your password',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;
}
