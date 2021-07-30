import { IsString } from 'class-validator'

export class createTaskDto {
  @IsString()
  readonly name: string
}
