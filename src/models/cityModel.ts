import { logger } from '../middleware/requestLogger';
import { selectFunction, insertFunction } from '../utils/query_service';

export class cityModel {
    static async getCities() {
      const query = `SELECT city_id, city_name FROM cities WHERE status = 1`;
      try {
        return await selectFunction(query);
      } catch (error) {
        logger.info('error', { message: error });
        throw error;
      }
    }

}