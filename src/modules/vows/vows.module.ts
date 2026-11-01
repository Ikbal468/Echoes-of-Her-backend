import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vow } from './vow.entity';
import { VowsService } from './vows.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vow])],
  providers: [VowsService],
  exports: [VowsService],
})
export class VowsModule {}

