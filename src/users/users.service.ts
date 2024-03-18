import { User } from './user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private readonly users: User[] = [
    {
      id: 1,
      name: 'Ravi Lodhiya',
      mobile: '447539383758',
    },
    {
      id: 2,
      name: 'Priti Lodhiya',
      mobile: '447971671840',
    },
  ];

  // Check user exists or not by mobile number
  async isUserExists(mobile: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({
      where: { mobile },
    });
    return user ? true : false;
  }

  // Find user by user.mobile and if not exists then create new user
  // and return user
  async findOrCreate(user: User): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { mobile: user.mobile },
    });
    if (existingUser) {
      return existingUser;
    }
    return this.create(user);
  }

  async create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findUserByMobile(mobile: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { mobile },
    });
    if (!user) {
      throw new NotFoundException(`User with mobile ${mobile} not found`);
    }
    return user;
  }
}
