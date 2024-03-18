import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Users')
export class User {
  constructor(name: string, mobile: string) {
    this.name = name;
    this.mobile = mobile;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', length: 70, nullable: false })
  name: string;

  @Column({ name: 'mobile', length: 12, nullable: false })
  mobile: string;

  @Column({ name: 'logged', nullable: true })
  logged?: boolean;

  @Column({ nullable: true })
  @CreateDateColumn()
  created?: string; // date

  @Column({ nullable: true })
  @UpdateDateColumn()
  updated?: string; // date
}
