import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      name: 'Ravi Lodhiya',
      mobile: '447539383758',
    },
    {
      id: 2,
      name: 'Chirag Kothari',
      mobile: '919227777660',
    },
  ];

  findOneById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  findOneByMobile(mobile: string): User | undefined {
    return this.users.find((user) => user.mobile === mobile);
  }
}
