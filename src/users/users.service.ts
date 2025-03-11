import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async create(CreateUserDto:CreateUserDto){
        const newUser = this.usersRepository.create({...CreateUserDto});
        const saveUser = this.usersRepository.save(newUser);
        return plainToInstance(User, saveUser); //N'affiche pas le MP
    }

    async findAll(): Promise<User[]> {
        const users = await this.usersRepository.find()
        return plainToInstance(User, users);
    }

    async findOne(id: string): Promise<User> {
        const user = await this.usersRepository.findOneBy({id});
        return plainToInstance(User, user);
    }

    async update(id: string, user: Partial<User>): Promise<User> {
        await this.usersRepository.update(id, user);
        const updateUser = this.findOne(id);
        return plainToInstance(User, updateUser);
    }

    async delete(id: string): Promise<User> {
        const deleteUser = this.findOne(id)
        await this.usersRepository.delete(id);
        return plainToInstance(User, deleteUser);
    }
}
