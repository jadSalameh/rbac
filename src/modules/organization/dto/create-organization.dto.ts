import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrganizationDto {
  @ApiProperty({ description: 'The name of the organization', example: 'VA Medical Center Dallas' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'A brief description of the organization', example: 'Providing comprehensive healthcare to veterans.', required: false })
  @IsString()
  @IsOptional()
  description?: string;


  @ApiProperty({ description: 'The physical address of the organization', example: '2201 S Stemmons Fwy, Dallas, TX 75216' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: 'The phone number of the organization', example: '214-742-8387' })
  @IsString()
  @IsNotEmpty()
  phone: string;
}
