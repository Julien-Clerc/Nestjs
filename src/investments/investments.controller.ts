import { Controller, UseGuards, Request, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InvestmentsService } from './investments.service';
import { Investment } from './investments.entity';
import { UsersService } from '../users/users.service';
import { CreateInvestmentDto } from './create-investment.dto';
import { ProjectsService } from '../projects/projects.service';

@Controller('investments')
export class InvestmentsController {
  constructor(
    private readonly investmentsService: InvestmentsService,
    private readonly usersService: UsersService,
    private readonly projectsService: ProjectsService
    ) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Request() req, @Body() createInvestmentDto: CreateInvestmentDto) {
      if (req.user.role !== 'investor') {
        throw new Error('Only investors can create investments');
      }
  
      const investor = await this.usersService.findOne(req.user.userId);
      const projects = await this.projectsService.findOne(createInvestmentDto.projectId);
  
      const investmentData: Partial<Investment> = {
        investor,
        projects,
        amount: createInvestmentDto.amount,
        date: new Date(),
      };
  
      const investment = await this.investmentsService.create(investmentData as Investment);
      return investment;
    }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAllByInvestor(@Request() req) {
    if (req.user.role !== 'investor') {
      throw new Error('Only investors can view their investments');
    }
    return this.investmentsService.findAllByInvestor(req.user.userId);
  }

  @Get('project/:id')
  @UseGuards(AuthGuard('jwt'))
  async findAllByProject(@Param('id') projectId: string) {
    return this.investmentsService.findAllByProject(projectId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id: string, @Request() req) {
    const investment = await this.investmentsService.findOne(id);
    if (investment.investor.id !== req.user.userId) {
      throw new Error('Only the investor can delete the investment');
    }
    return this.investmentsService.delete(id);
  }
}
