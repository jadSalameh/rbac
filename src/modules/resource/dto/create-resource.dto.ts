import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateResourceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The ID of the resource provider',
    example: 'provider123',
  })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The ID of the organization that this record belongs to',
    example: 'provider123',
  })
  organizationId: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The resource data (e.g., patient record details)',
    type: 'string',
  })
  data: string;
}
