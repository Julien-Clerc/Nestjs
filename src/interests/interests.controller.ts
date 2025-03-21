import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { InterestsService } from './interests.service';
import { Interest } from './interests.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('interests')
export class InterestsController {
  constructor(private readonly interestsService: InterestsService) {}

  @Get()
  findAll(): Promise<Interest[]> {
    return this.interestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Interest | null> {
    return this.interestsService.findOneWithRelations(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body('name') name: string): Promise<Interest> {
    return this.interestsService.create(name);
  }
}
