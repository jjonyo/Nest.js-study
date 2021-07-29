import { IsNumber, IsString } from 'class-validator';

export class createCarDto {
  @IsString()
  model: string;

  @IsNumber()
  price: number;
}
