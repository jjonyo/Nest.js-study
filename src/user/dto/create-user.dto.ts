import { IsNumber, IsOptional, IsString } from 'class-validator'
import { Car } from 'src/car/car.entity'
import { Task } from '../task.entity'

export class createUserDto {
  @IsString()
  readonly name: string

  @IsString()
  readonly gender: string

  @IsNumber()
  readonly age: number

  @IsOptional()
  readonly car: Car

  @IsOptional()
  readonly task: Task[]
}
