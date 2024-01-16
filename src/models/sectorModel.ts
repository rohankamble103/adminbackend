import { logger } from '../middleware/requestLogger';
import { selectFunction, insertFunction } from '../utils/query_service';

export class sectorModel {
    static async getSectors() {
      const query = `SELECT sector_id, sector FROM sectors WHERE status = 1`;
      try {
        return await selectFunction(query);
      } catch (error) {
        logger.info('error', { message: error });
        throw error;
      }
    }

}