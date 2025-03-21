import { Controller, Get, Param, Post, Put, Delete, Body, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto'
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/role.enum'
import { InterestsService } from 'src/interests/interests.service';
import { Interest } from 'src/interests/interests.entity';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly interestsService: InterestsService
    ) {}

    @Post('register')
    async create(@Body() CreateUserDto:CreateUserDto){
        return this.usersService.create(CreateUserDto);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.Admin)
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get('profile')
    @UseGuards(AuthGuard('jwt'))
    async getProfile(@Request() req): Promise<User | null> {
        const user = this.usersService.findOne(req.user.userId)
        return user;
      }

    @Put('profile')
    @UseGuards(AuthGuard('jwt'))
    async updateProfile(@Request() req, @Body() updateUserDto: Partial<User>): Promise<User> {
        console.log(req.user)
        const userId = req.user?.userId;
        if (!userId) {
          throw new Error('User ID is missing');
        }
        return this.usersService.update(userId, updateUserDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.Admin)
    async delete(@Param('id') id: string): Promise<void> {
        await this.usersService.delete(id);
    }

    @Get('interests')
    @UseGuards(AuthGuard('jwt'))
    async getUserInterests(@Request() req): Promise<Interest[] | null> {
        const user = await this.usersService.findOne(req.user.userId);
        // if (!user) {
        //     throw new Error('User is missing');
        // }
        return user.interests;
    }

    @Post('interests')
    @UseGuards(AuthGuard('jwt'))
    async addUserInterests(@Request() req, @Body('interestIds') interestIds: string[]) {
        if (!Array.isArray(interestIds) || interestIds.length === 0) {
            throw new Error('Interest IDs must be a non-empty array');
        }
        const user = await this.usersService.findOne(req.user?.userId);
        const interests = await this.interestsService.findByIds(interestIds);
        if (!user) {
            throw new Error('User is missing');
        }
        user.interests = interests;
        
        return this.usersService.save(user);
    }
}
