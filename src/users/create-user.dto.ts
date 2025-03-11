import { IsEmail, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string

    @IsString()
    password: string;

    @IsString()
    @IsOptional()
    firstname: string;

    @IsString()
    @IsOptional()
    lastname: string;

    @IsOptional()
    role: string
    
}