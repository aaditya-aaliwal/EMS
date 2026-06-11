import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  create(user: Partial<User>) {
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, user: Partial<User>) {
    await this.userRepository.update(id, user);
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.userRepository.delete(id);
  }

  async findById(id: number) {
  return this.userRepository.findOne({
    where: { id },
  });
}

async updatePassword(
  id: number,
  hashedPassword: string,
) {
  await this.userRepository.update(id, {
    password: hashedPassword,
  });

  return this.findById(id);
}
}