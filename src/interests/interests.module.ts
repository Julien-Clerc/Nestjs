import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterestsService } from './interests.service';
import { InterestsController } from './interests.controller';
import { Interest } from './interests.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Interest])],
  providers: [InterestsService],
  controllers: [InterestsController],
  exports: [InterestsService],
})
export class InterestsModule {}