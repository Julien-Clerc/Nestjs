import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlacklistToken } from './blacklist-token.entity';

@Injectable()
export class BlacklistService {
  constructor(
    @InjectRepository(BlacklistToken)
    private blacklistRepository: Repository<BlacklistToken>,
  ) {}

  async addToBlacklist(token: string, expiresAt: Date): Promise<void> {
    const blacklistToken = this.blacklistRepository.create({ token, expiresAt });
    await this.blacklistRepository.save(blacklistToken);
  }

  async isBlacklisted(token: string): Promise<boolean> {
    const blacklistToken = await this.blacklistRepository.findOne({ where: { token } });
    if (blacklistToken && new Date(blacklistToken.expiresAt) > new Date()) {
      return true;
    }
    return false;
  }
}

