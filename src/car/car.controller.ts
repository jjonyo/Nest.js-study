import { Body, Controller, Post } from '@nestjs/common';
import { CarService } from './car.service';
import { createCarDto } from './dto/create-car.dto';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  crateCar(@Body() carData: createCarDto) {
    return this.carService.createCar(carData);
  }
}
