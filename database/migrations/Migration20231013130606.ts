import { Migration } from '@mikro-orm/migrations';

export class Migration20231013130606 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "api_forecast" ("id" varchar(255) not null, "lat" double precision not null, "lon" double precision not null, "timezone" varchar(255) not null, "timezone_offset" int not null, "current" jsonb null, "minutely" jsonb null, "hourly" jsonb null, "daily" jsonb null, "alerts" jsonb null, constraint "api_forecast_pkey" primary key ("id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "api_forecast" cascade;');
  }

}
