import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Forecast } from './forecast.entity';
import { CurrentForecastData } from './forecast.types';

export type CurrentForecastResponse = Pick<
  CurrentForecastData,
  | 'sunrise'
  | 'sunset'
  | 'temp'
  | 'feels_like'
  | 'pressure'
  | 'humidity'
  | 'uvi'
  | 'wind_speed'
>;

@Injectable()
export class ForecastInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<Forecast>,
  ): Observable<CurrentForecastResponse> {
    return next.handle().pipe(
      map((forecast) => ({
        sunrise: forecast.current.sunrise,
        sunset: forecast.current.sunset,
        temp: forecast.current.temp,
        feels_like: forecast.current.feels_like,
        pressure: forecast.current.pressure,
        humidity: forecast.current.humidity,
        uvi: forecast.current.uvi,
        wind_speed: forecast.current.wind_speed,
      })),
    );
  }
}
