import { IsString, IsNumber, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  budget: number;

  @IsString()
  @IsNotEmpty()
  category: string;
}
