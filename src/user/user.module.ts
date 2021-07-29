import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from 'src/car/car.entity';
import { CarService } from 'src/car/car.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Car])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
