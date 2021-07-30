import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { Car } from 'src/car/car.entity'
import { createTaskDto } from './dto/crate-task.dto'
import { createMeetingDto } from './dto/create-meeting.dto'
import { createUserDto } from './dto/create-user.dto'
import { updateUserDto } from './dto/update-user.dto'
import { User } from './user.entity'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUser(): Promise<User[]> {
    return this.userService.getAllUsers()
  }

  @Post('meeting')
  createMeeting(@Body() MeetingInfo: createMeetingDto) {
    return this.userService.createMeeting(MeetingInfo)
  }

  @Get('meeting/:id')
  getMeeting(@Param('id') meetingId: number) {
    return this.userService.getMeeting(meetingId)
  }

  @Patch('meeting/:id')
  addUserToMeeting(@Param('id') meetingId: number, @Body() data: any) {
    this.userService.addUserToMeeting(meetingId, data.userId)
  }

  @Get('car/:id')
  getCarInfo(@Param('id') id: number): Promise<Car> {
    return this.userService.getCarInfo(id)
  }

  @Patch('task/:id')
  createTask(@Param('id') userId: number, @Body() taskData: createTaskDto) {
    return this.userService.createTask(userId, taskData)
  }

  @Get(':id')
  getUserById(@Param('id') id: number): Promise<User> {
    return this.userService.getUserById(id)
  }

  @Post()
  createUser(@Body() userData: createUserDto) {
    return this.userService.createUser(userData)
  }

  @Delete(':id')
  deleteUserById(@Param('id') id: number) {
    this.userService.deleteUser(id)
  }

  @Patch(':id')
  updateCarById(@Param('id') id: number, @Body() userData: updateUserDto) {
    const { car: carId } = userData
    return this.userService.updateCarById(id, carId)
  }
}
