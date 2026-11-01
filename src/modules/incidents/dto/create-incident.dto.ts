import { IsNotEmpty, IsString, IsOptional, IsInt, Min, Max } from 'class-validator';

export class CreateIncidentDto {
  @IsNotEmpty()
  @IsString()
  triggerDescription: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsInt()
  @Min(1)
  @Max(5)
  intensity: number;

  @IsOptional()
  @IsInt()
  vowId?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  reflectedDurationSeconds?: number;
}

