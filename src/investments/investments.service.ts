import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Investment } from './investments.entity';

@Injectable()
export class InvestmentsService {
  constructor(
    @InjectRepository(Investment)
    private investmentsRepository: Repository<Investment>,
  ) {}

  async create(investment: Partial<Investment>): Promise<Investment> {
    const newInvestment = this.investmentsRepository.create(investment);
    return this.investmentsRepository.save(newInvestment);
  }

  async findAllByInvestor(investorId: string): Promise<Investment[]> {
    return this.investmentsRepository.find({
      where: { investor: { id: investorId } },
      relations: ['project'],
    });
  }

  async findAllByProject(projectId: string): Promise<Investment[]> {
    return this.investmentsRepository.find({
      where: { projects: { id: projectId } },
      relations: ['investor'],
    });
  }

  async findAll(): Promise<Investment[]> {
      const investments = await this.investmentsRepository.find()
      return investments;
  }

  async findOne(id: string): Promise<Investment> {
    const investment = await this.investmentsRepository.findOne({
      where: { id },
      relations: ['investor', 'project'],
    });
    if (!investment) {
      throw new NotFoundException(`Investment with ID ${id} not found`);
    }
    return investment;
  }

  async delete(id: string): Promise<void> {
    const result = await this.investmentsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Investment with ID ${id} not found`);
    }
  }
}
