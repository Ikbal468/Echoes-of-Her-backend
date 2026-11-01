import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IncidentLog } from './incident-log.entity';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { AffirmIncidentDto } from './dto/affirm-incident.dto';
import { Vow } from '../vows/vow.entity';

@Injectable()
export class IncidentsService {
  constructor(
    @InjectRepository(IncidentLog)
    private incidentRepo: Repository<IncidentLog>,
    @InjectRepository(Vow)
    private vowRepo: Repository<Vow>,
  ) {}

  async create(dto: CreateIncidentDto) {
    const vow = dto.vowId
      ? await this.vowRepo.findOne({ where: { id: dto.vowId } })
      : await this.vowRepo.findOne({ where: { isActive: true }, order: { id: 'DESC' } });

    const log = this.incidentRepo.create({
      triggerDescription: dto.triggerDescription,
      location: dto.location || 'Unknown',
      intensity: dto.intensity,
      reflectedDurationSeconds: dto.reflectedDurationSeconds || 0,
      committed: true,
      vow,
    });

    const saved = await this.incidentRepo.save(log);

    return {
      success: true,
      data: saved,
      anchorVow: vow ? vow.content : 'Hold your ground. Keep your promise.',
    };
  }

  async affirm(id: number, dto: AffirmIncidentDto) {
    const incident = await this.incidentRepo.findOne({ where: { id } });
    if (!incident) {
      throw new NotFoundException(`Incident #${id} not found`);
    }
    incident.reflectedDurationSeconds = dto.reflectedDurationSeconds;
    incident.committed = true;
    return this.incidentRepo.save(incident);
  }

  findAll() {
    return this.incidentRepo.find({ order: { createdAt: 'DESC' } });
  }

  async getMetrics() {
    const totalDefended = await this.incidentRepo.count();
    const history = await this.incidentRepo.find({ order: { createdAt: 'DESC' } });
    return { totalDefended, history };
  }
}
