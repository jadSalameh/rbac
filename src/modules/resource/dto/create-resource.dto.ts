import { IsString, IsNotEmpty, IsObject } from 'class-validator';

export class CreateResourceDto {
  @IsString()
  @IsNotEmpty()
  providerId: string;

  @IsObject()
  @IsNotEmpty()
  data: Record<string, any>;
}
