import { Migration } from '@mikro-orm/migrations';

export class Migration20231013103536 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "forecast" ("id" varchar(255) not null, "lat" double precision not null, "lon" double precision not null, "timezone" varchar(255) not null, "timezone_offset" int not null, "current" jsonb null, "minutely" jsonb null, "hourly" jsonb null, "daily" jsonb null, "alerts" jsonb null, constraint "forecast_pkey" primary key ("id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "forecast" cascade;');
  }

}
