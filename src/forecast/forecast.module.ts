import { MikroOrmModule } from '@mikro-orm/nestjs';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ForecastController } from './forecast.controller';
import { Forecast } from './forecast.entity';
import { ForecastService } from './forecast.service';

@Module({
  controllers: [ForecastController],
  providers: [ForecastService],
  imports: [
    MikroOrmModule.forFeature([Forecast]),
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          baseURL: 'https://api.openweathermap.org/data/3.0/onecall',
          params: {
            appid: configService.get('apiKey'),
          },
        };
      },
    }),
  ],
})
export class ForecastModule {}
