import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { FollowForecastDto } from './dto/create-forecast.dto';
import { ForecastInterceptor } from './forecast.interceptor';
import { ForecastService } from './forecast.service';

@Controller('forecast')
export class ForecastController {
  constructor(private readonly forecastService: ForecastService) {}

  @Post()
  createForecast(@Body() dto: FollowForecastDto) {
    return this.forecastService.createForecast(dto);
  }

  @Get()
  @UseInterceptors(ForecastInterceptor)
  getForecast(@Query() query: FollowForecastDto) {
    return this.forecastService.getForecast(query);
  }
}
