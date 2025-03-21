import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async create(CreateUserDto:CreateUserDto){
        const existingUSer = await this.usersRepository.findOneBy({email: CreateUserDto.email})
        if (existingUSer) {
            throw new ConflictException('Email deja utilisé');
        }
        const hashedPassword = await bcrypt.hash(CreateUserDto.password, 10) //10 = SaltRounds
        const newUser = this.usersRepository.create({...CreateUserDto, password: hashedPassword});
        const saveUser = this.usersRepository.save(newUser);
        return plainToInstance(User, saveUser); //N'affiche pas le MP
    }

    async findAll(): Promise<User[]> {
        const users = await this.usersRepository.find()
        return plainToInstance(User, users);
    }

    async findOne(id: string): Promise<User> {        
        const user = await this.usersRepository.findOne({
            where: {id}, 
            relations: ['interests']
        });
        return plainToInstance(User, user);
        // return user;
    }

    async findOneByEmail(email: string): Promise<User> {
        const user = await this.usersRepository.findOneBy({ email  })
        return plainToInstance(User, user);
      }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        console.log('Updating user with ID:', id, 'Data:', updateUserDto)
        
        const user = await this.findOne(id);
        if (!user) {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
        await this.usersRepository.update(id, updateUserDto);
        return plainToInstance(User, user);
    }

    async delete(id: string): Promise<User> {
        const deleteUser = this.findOne(id)
        await this.usersRepository.delete(id);
        return plainToInstance(User, deleteUser);
    }

    async save(user: User): Promise<User> {
        return this.usersRepository.save(user);
    }
}
