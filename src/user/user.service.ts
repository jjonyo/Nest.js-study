import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Car } from 'src/car/car.entity'
import { Repository } from 'typeorm'
import { createTaskDto } from './dto/crate-task.dto'
import { createMeetingDto } from './dto/create-meeting.dto'
import { createUserDto } from './dto/create-user.dto'
import { Meeting } from './meeting.entity'
import { Task } from './task.entity'
import { User } from './user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Meeting)
    private meetingRepository: Repository<Meeting>,
  ) {}

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find()
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['car', 'task', 'meetings'],
    })
    if (!user) throw new NotFoundException(`user not found with the id ${id}`)
    return user
  }

  createUser(userData: createUserDto) {
    this.userRepository.save(userData)
  }

  deleteUser(id: number) {
    this.userRepository.delete(id)
  }

  async updateCarById(id: number, carId: Car) {
    try {
      const car = await this.carRepository.findOne(carId)
      console.log(car)
      if (!car)
        throw new NotFoundException(`car not found with the id ${carId}`)
      const user = await this.userRepository.findOne(id)
      user.car = car
      console.log(user)
      this.userRepository.save(user)
    } catch (err) {
      throw new Error(err)
    }
  }

  async getCarInfo(id: number): Promise<Car> {
    try {
      const user = await this.userRepository.findOne(id, { relations: ['car'] })
      if (!user) throw new NotFoundException(`user not found with the id ${id}`)
      return user.car
    } catch (err) {
      throw new Error(err)
    }
  }

  async createTask(id: number, taskData: createTaskDto) {
    const user = await this.userRepository.findOne(id, {
      relations: ['task'],
    })
    const task = await this.taskRepository.save(taskData)
    user.task.push(task)
    return await this.userRepository.save(user)
  }

  async createMeeting(meetingInfo: createMeetingDto) {
    const { owner, name } = meetingInfo
    const user = await this.userRepository.findOne(owner, {
      relations: ['meetings'],
    })
    const meeting = await this.meetingRepository.save({
      name: name,
      owner: user,
    })
    user.meetings.push(meeting)
    await this.userRepository.save(user)
  }

  async addUserToMeeting(meetingId: number, userId: number) {
    const user = await this.userRepository.findOne(userId, {
      relations: ['meetings'],
    })
    const meeting = await this.meetingRepository.findOne(meetingId)
    user.meetings.push(meeting)
    await this.userRepository.save(user)
  }

  async getMeeting(meetingId: number): Promise<Meeting> {
    const meeting = await this.meetingRepository.findOne(meetingId, {
      relations: ['owner', 'user'],
    })
    if (!meeting)
      throw new NotFoundException(`Not found meeting with the id ${meetingId}`)
    return meeting
  }
}
