import { Controller, Post, Patch, Get, Body, Param, ParseIntPipe } from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { AffirmIncidentDto } from './dto/affirm-incident.dto';

@Controller('incidents')
export class IncidentsController {
  constructor(private readonly service: IncidentsService) {}

  @Post()
  create(@Body() dto: CreateIncidentDto) {
    return this.service.create(dto);
  }

  @Patch(':id/affirm')
  affirm(@Param('id', ParseIntPipe) id: number, @Body() dto: AffirmIncidentDto) {
    return this.service.affirm(id, dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('metrics')
  getMetrics() {
    return this.service.getMetrics();
  }
}
