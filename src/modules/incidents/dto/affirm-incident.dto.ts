import { IsInt, Min } from 'class-validator';

export class AffirmIncidentDto {
  @IsInt()
  @Min(0)
  reflectedDurationSeconds: number;
}

