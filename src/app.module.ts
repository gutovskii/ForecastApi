import { MikroOrmModule } from '@mikro-orm/nestjs';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { getConfig } from './common/config';
import { ForecastModule } from './forecast/forecast.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [getConfig],
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
      }),
    }),
    MikroOrmModule.forRoot(),
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          baseURL: configService.get('baseUrl'),
          params: {
            appid: configService.get('apiKey'),
          },
        };
      },
    }),
    ForecastModule,
  ],
})
export class AppModule {}
