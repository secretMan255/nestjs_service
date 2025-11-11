import {
    IsString,
    IsNotEmpty,
    IsEmail
} from 'class-validator';

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}

export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}