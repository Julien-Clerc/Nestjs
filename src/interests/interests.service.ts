import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Interest } from './interests.entity';

@Injectable()
export class InterestsService {
  constructor(
    @InjectRepository(Interest)
    private interestsRepository: Repository<Interest>,
  ) {}

  findAll(): Promise<Interest[]> {
    return this.interestsRepository.find({ relations: ['users'] });
  }

  async findOneWithRelations(id: string): Promise<Interest | null> {
    return this.interestsRepository.findOne({
      where: { id },
      relations: ['users'],
    });
  }

  async create(name: string): Promise<Interest> {
    const interest = this.interestsRepository.create({ name });
    return this.interestsRepository.save(interest);
  }

  async findByIds(ids: string[]): Promise<Interest[]> {
    return this.interestsRepository.find({where: {id: In(ids) } })
  }
}