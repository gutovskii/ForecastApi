export type CurrentForecastData = {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_deg: number;
  wind_speed: number;
  wind_gust: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
};

export type MinutelyForecastData = {
  dt: number;
  precipitation: number;
};

export type HourlyForecastData = {
  dt: number;
  temp: number;
  feels_like: number;
  pressured: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  pop: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
};

export type DailyForecastData = {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  summary: string;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: number;
  pop: number;
  rain: number;
  uvi: number;
};

export type AlertsForecastData = {
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
  tags: string[];
};
