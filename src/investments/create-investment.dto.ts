import { IsNumber, IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateInvestmentDto {
  @IsUUID()
  projectId: string;

  @IsNumber()
  amount: number;
}
