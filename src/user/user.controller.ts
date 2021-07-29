import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { Car } from 'src/car/car.entity';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUser(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get('car/:id')
  getCarInfo(@Param('id') id: number): Promise<Car> {
    return this.userService.getCarInfo(id);
  }

  @Get(':id')
  getUserById(@Param('id') id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() userData: createUserDto) {
    return this.userService.createUser(userData);
  }

  @Delete(':id')
  deleteUserById(@Param('id') id: number) {
    this.userService.deleteUser(id);
  }

  @Patch(':id')
  updateCarById(@Param('id') id: number, @Body() userData: updateUserDto) {
    const { car: carId } = userData;
    return this.userService.updateCarById(id, carId);
  }
}
