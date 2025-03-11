import { Controller, Get, Param, Post, Put, Delete, Body, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    async create(@Body() CreateUserDto:CreateUserDto){
        return this.userService.create(CreateUserDto);
    }

    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User> {
        return this.userService.findOne(id);
    }

    @Put(':id')
    async updateProfile(@Request() requestAnimationFrame, @Body() CreateUserDto: Partial<User>): Promise<User> {
        return this.userService.update(requestAnimationFrame.user.userId, CreateUserDto)
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        await this.userService.delete(id);
    }
}
