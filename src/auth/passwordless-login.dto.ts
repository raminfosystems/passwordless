import { IsMobilePhone, IsString } from 'class-validator';

export class PasswordlessLoginDto {
  @IsMobilePhone('en-GB')
  destination: string;

  @IsString()
  name: string;
}
