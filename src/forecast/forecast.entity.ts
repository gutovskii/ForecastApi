import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { ForecastRepository } from './forecast.repository';
import {
  AlertsForecastData,
  CurrentForecastData,
  DailyForecastData,
  HourlyForecastData,
  MinutelyForecastData,
} from './forecast.types';

@Entity({
  tableName: 'api_forecast',
  customRepository: () => ForecastRepository,
})
export class Forecast {
  @PrimaryKey()
  id: string = v4();

  @Property({ type: 'double' })
  lat: number;

  @Property({ type: 'double' })
  lon: number;

  @Property()
  timezone: string;

  @Property()
  timezone_offset: number;

  @Property({ type: 'json', nullable: true })
  current?: CurrentForecastData;

  @Property({ type: 'json', nullable: true })
  minutely?: MinutelyForecastData[];

  @Property({ type: 'json', nullable: true })
  hourly?: HourlyForecastData[];

  @Property({ type: 'json', nullable: true })
  daily?: DailyForecastData[];

  @Property({ type: 'json', nullable: true })
  alerts?: AlertsForecastData[];

  [EntityRepositoryType]?: ForecastRepository;
}
