import { IsNumber, IsString } from 'class-validator'
import { User } from '../user.entity'

export class createMeetingDto {
  @IsString()
  name: string

  @IsNumber()
  owner: User
}
