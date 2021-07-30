import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Car } from 'src/car/car.entity'
import { Task } from './task.entity'
import { Meeting } from './meeting.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  gender: string

  @Column()
  age: number

  @OneToOne(() => Car, (car) => car.user)
  @JoinColumn()
  car: Car

  @Column({ nullable: true })
  carId: number

  @OneToMany(() => Task, (task) => task.user, { nullable: true })
  task: Task[]

  @ManyToMany(() => Meeting, (meetings) => meetings.user)
  @JoinTable()
  meetings: Meeting[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
