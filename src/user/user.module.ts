import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Car } from 'src/car/car.entity'
import { Meeting } from './meeting.entity'
import { Task } from './task.entity'
import { UserController } from './user.controller'
import { User } from './user.entity'
import { UserService } from './user.service'

@Module({
  imports: [TypeOrmModule.forFeature([User, Car, Task, Meeting])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
