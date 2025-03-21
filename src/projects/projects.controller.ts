import { Controller, UseGuards, Request, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProjectsService } from './projects.service';
import { Project } from './projects.entity';
import { CreateProjectDto } from './create-project.dto';
import { UsersService } from '../users/users.service';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly usersService: UsersService,
    ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Request() req, @Body() createProjectDto: CreateProjectDto) {
    if (req.user.role !== 'entrepreneur') {
      throw new Error('Only entrepreneurs can create projects');
    }

    const owner = await this.usersService.findOne(req.user.userId);
    return this.projectsService.create({ ...createProjectDto, owner } as Project);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string, @Request() req, @Body() project: Partial<Project>) {
    const existingProject = await this.projectsService.findOne(id);
    if (existingProject.owner.id !== req.user.userId && req.user.role !== 'admin') {
      throw new Error('Only the project owner or admin can update the project');
    }
    return this.projectsService.update(id, project);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id: string, @Request() req) {
    const existingProject = await this.projectsService.findOne(id);
    if (existingProject.owner.id !== req.user.userId && req.user.role !== 'admin') {
      throw new Error('Only the project owner or admin can delete the project');
    }
    return this.projectsService.delete(id);
  }
}
