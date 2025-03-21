import { Controller, Get,  Delete, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum'
import { UsersService } from '../users/users.service';
import { InvestmentsService } from '../investments/investments.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly usersService: UsersService,
    private readonly investmentsService: InvestmentsService,
  ) {}

  @Get('users')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Delete('users/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  async deleteUser(@Param('id') id: string) {
    return this.usersService.delete(id);
  }

  @Get('investments')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  async getAllInvestments() {
    return this.investmentsService.findAll();
  }
}
