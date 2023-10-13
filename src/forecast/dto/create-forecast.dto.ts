import { Type } from 'class-transformer';
import { IsOptional, Matches, Max, Min } from 'class-validator';

export class FollowForecastDto {
  @Type(() => Number)
  @Max(90)
  @Min(-90)
  lat: number;

  @Type(() => Number)
  @Max(180)
  @Min(-180)
  lon: number;

  @IsOptional()
  @Matches(
    /^(current|minutely|hourly|daily|alerts|)(,(current|minutely|hourly|daily|alerts))*$/,
  )
  part?: string;
}
