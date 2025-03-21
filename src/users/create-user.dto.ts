import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string

    @IsString()
    @MinLength(6, {message: 'Le mot de passe doit contenir 6 caractères minimum'})
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