import { Test, TestingModule } from '@nestjs/testing';
import { FollowForecastDto } from './dto/create-forecast.dto';
import { ForecastController } from './forecast.controller';
import { CurrentForecastResponse } from './forecast.interceptor';
import { ForecastService } from './forecast.service';

describe('AppController', () => {
  let forecastController: ForecastController;

  const mockForecastService = {
    createForecast: jest
      .fn()
      .mockImplementation((dto: FollowForecastDto) => Promise.resolve({})),
    getForecast: jest
      .fn()
      .mockImplementation((query: FollowForecastDto) =>
        Promise.resolve(getFakeForecast()),
      ),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ForecastController],
      providers: [
        {
          provide: ForecastService,
          useValue: mockForecastService,
        },
      ],
    }).compile();

    forecastController = app.get<ForecastController>(ForecastController);
  });

  it('should be defined', () => {
    expect(forecastController).toBeDefined();
  });

  it('should create forecast', async () => {
    const dto: FollowForecastDto = {
      lat: 33.44,
      lon: -94.04,
      part: 'minutely,hourly,alerts,daily',
    };
    expect(await forecastController.createForecast(dto)).toEqual({});
    expect(mockForecastService.createForecast).toBeCalledTimes(1);
  });

  it('should find forecast', async () => {
    const query: FollowForecastDto = {
      lat: 33.44,
      lon: -94.04,
      part: 'minutely,hourly,alerts,daily',
    };
    expect(await forecastController.getForecast(query)).toEqual(
      getFakeForecast(),
    );
    expect(mockForecastService.getForecast).toBeCalledTimes(1);
  });
});

const getFakeForecast = (): CurrentForecastResponse => ({
  sunrise: 1684926645,
  sunset: 1684977332,
  temp: 292.55,
  feels_like: 292.87,
  pressure: 1014,
  humidity: 89,
  uvi: 0.16,
  wind_speed: 3.13,
});
