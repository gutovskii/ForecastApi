import { wrap } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { FollowForecastDto } from './dto/create-forecast.dto';
import { Forecast } from './forecast.entity';
import { ForecastRepository } from './forecast.repository';

@Injectable()
export class ForecastService {
  constructor(
    private readonly em: EntityManager,
    private readonly httpService: HttpService,
    private readonly forecastRepository: ForecastRepository,
  ) {}

  async createForecast(dto: FollowForecastDto) {
    try {
      const $data = this.httpService.get<Forecast>('', {
        params: {
          lat: dto.lat,
          lon: dto.lon,
          exclude: dto.part ?? '',
        },
      });
      const { data: forecast } = await firstValueFrom($data);
      const isForecastExists = await this.forecastRepository.isExistsByLatLon(
        forecast.lat,
        forecast.lon,
      );
      if (!isForecastExists) {
        const forecastToCreate = this.forecastRepository.create(forecast);
        await this.forecastRepository.upsert(forecastToCreate);
        return;
      }
      const { id } = await this.forecastRepository.findOne(
        { lat: forecast.lat, lon: forecast.lon },
        { fields: ['id'] },
      );
      const forecastRef = this.forecastRepository.getReference(id);
      wrap(forecastRef).assign(forecast);
      await this.em.flush();
    } catch (err: unknown) {
      throw new InternalServerErrorException(err);
    }
  }

  async getForecast(query: FollowForecastDto) {
    const forecast = await this.forecastRepository.findOne({
      lat: query.lat,
      lon: query.lon,
    });
    if (!forecast) {
      throw new NotFoundException(
        `The forecast with lat: ${query.lat} lon: ${query.lon} not found`,
      );
    }
    if (!forecast.current) {
      throw new BadRequestException(
        `This forecast (lat: ${query.lat} lan: ${query.lon}) does not have 'current' field. Fill it and try again`,
      );
    }
    return forecast;
  }
}
