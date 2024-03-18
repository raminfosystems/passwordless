import { IsMobilePhone } from 'class-validator';

export class PasswordlessLoginDto {
  @IsMobilePhone('en-GB')
  destination: string;
}
