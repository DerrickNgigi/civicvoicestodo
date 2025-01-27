import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(userId: string): Promise<User> {
    return this.userRepository.findOne({ where: { userId } });
    
  }

  //find by email
  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async update(userId:string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update({ userId }, updateUserDto);
    return this.userRepository.findOne({ where: { userId } });
  }

  async remove(userId: string) {
    await this.userRepository.delete({ userId });
    return `User ${userId} has been deleted`;
  }
}
