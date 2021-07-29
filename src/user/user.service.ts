import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from 'src/car/car.entity';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
  ) {}

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) throw new NotFoundException(`user not found with the id ${id}`);
    return user;
  }

  createUser(userData: createUserDto) {
    this.userRepository.save(userData);
  }

  deleteUser(id: number) {
    this.userRepository.delete(id);
  }

  async updateCarById(id: number, carId: Car) {
    try {
      const car = await this.carRepository.findOne(carId);
      console.log(car);
      if (!car)
        throw new NotFoundException(`car not found with the id ${carId}`);
      const user = await this.userRepository.findOne(id);
      user.car = car;
      console.log(user);
      this.userRepository.save(user);
    } catch (err) {
      throw new Error(err);
    }
  }

  async getCarInfo(id: number): Promise<Car> {
    const user = await this.userRepository.findOne(id);
    if (!user || !user.carId) throw new NotFoundException(`not found error`);
    const carInfo = await this.carRepository.findOne(user.carId);
    return carInfo;
  }
}
