import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncidentLog } from './incident-log.entity';
import { Vow } from '../vows/vow.entity';
import { IncidentsController } from './incidents.controller';
import { IncidentsService } from './incidents.service';

@Module({
  imports: [TypeOrmModule.forFeature([IncidentLog, Vow])],
  controllers: [IncidentsController],
  providers: [IncidentsService],
})
export class IncidentsModule {}

