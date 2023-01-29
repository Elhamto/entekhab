import { PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNumber()
  @IsOptional()
  charge?: number;

  @IsString()
  @IsOptional()
  photo?: string;

  @IsString()
  @IsArray()
  @IsOptional()
  phoneNumber?: string;
}
