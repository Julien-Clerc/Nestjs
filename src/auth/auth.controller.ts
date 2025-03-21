import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { BlacklistService } from './blacklist.service';
import { User } from 'src/users/user.entity';
import { UsersService } from "src/users/users.service";

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private blacklistService: BlacklistService,
    private usersService: UsersService
  ) {}

  // @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() user: User) {
    const userInfo = await this.usersService.findOneByEmail(user.email)
    console.log('login' + userInfo.id, userInfo.email, userInfo.role)
    return this.authService.login(userInfo);
  }

  @Post('logout')
  async logout(@Request() req) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token) {
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 1); // Assuming 1 hour expiration
      await this.blacklistService.addToBlacklist(token, expiresAt);
    }
    return { message: 'Logout successful' };
  }
}
