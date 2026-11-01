import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vow } from './vow.entity';

@Injectable()
export class VowsService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Vow)
    private vowRepo: Repository<Vow>,
  ) {}

  async onApplicationBootstrap() {
    const count = await this.vowRepo.count();
    if (count === 0) {
      await this.vowRepo.save({
        title: 'The Final Pledge',
        content:
          'She was the last chapter of my heart. Every feeling that stirs now is fleeting noise. I chose to stay anchored to the promise I made.',
        isActive: true,
      });
    }
  }

  getActiveVow() {
    return this.vowRepo.findOne({ where: { isActive: true }, order: { id: 'DESC' } });
  }
}

