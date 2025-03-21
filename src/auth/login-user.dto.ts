import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
    @IsEmail()
    @IsNotEmpty()
    id: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsEmail()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    role: string;
}
