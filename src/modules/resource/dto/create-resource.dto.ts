import { IsString, IsNotEmpty, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateResourceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The ID of the resource provider', example: 'provider123' })
  providerId: string;

  @IsObject()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The resource data (e.g., patient record details)',
    type: 'object',
    example: {
      patientName: 'John Doe',
      dateOfBirth: '1990-01-01',
    },
  })
  data: Record<string, any>;
}