import { EntityRepository } from '@mikro-orm/postgresql';
import { Forecast } from './forecast.entity';

export class ForecastRepository extends EntityRepository<Forecast> {
  async isExistsByLatLon(lat: number, lon: number): Promise<boolean> {
    return !!(await this.findOne({ lat, lon }, { fields: ['id'] }));
  }
}
