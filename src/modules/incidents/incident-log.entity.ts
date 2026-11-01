import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Vow } from '../vows/vow.entity';

@Entity('incident_logs')
export class IncidentLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  triggerDescription: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  location: string;

  @Column({ type: 'int', default: 3 })
  intensity: number;

  @Column({ type: 'int', default: 0 })
  reflectedDurationSeconds: number;

  @Column({ type: 'boolean', default: true })
  committed: boolean;

  @ManyToOne(() => Vow, (vow) => vow.incidentLogs, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'vowId' })
  vow: Vow | null;

  @CreateDateColumn()
  createdAt: Date;
}

