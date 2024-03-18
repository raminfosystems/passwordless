import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      mobile: '447539383758',
    },
    {
      id: 2,
      name: 'Jane Doe',
      mobile: '12382873478374',
    },
  ];

  findOneById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  findOneByMobile(mobile: string): User | undefined {
    return this.users.find((user) => user.mobile === mobile);
  }
}
