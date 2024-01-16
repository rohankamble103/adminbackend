import { logger } from '../middleware/requestLogger';
import { selectFunction, insertFunction } from '../utils/query_service';

interface ExistingUser {
  status: string;
  data?: UserData[];
}

interface UserData {
  user_id: number;
  username: string;
  email: string;
  password?: string;
  role_id?: number;
  // Other properties as needed
}

export class UserModel {
  static async findUsername(username: string) {
    const query = `SELECT user_id, username, email, password, role_id FROM users_login WHERE username = '${username}'`;
    try {
      const result = await selectFunction(query);
      return result;
    } catch (error) {
      logger.info('error', { message: error });
      throw error;
    }
  }

  static async findUserByEmail(email: string) {
    const query = `SELECT user_id, username, email FROM users_login WHERE email = '${email}'`;
    try {
      const result = await selectFunction(query);
      return result;
    } catch (error) {
      logger.info('error', { message: error });
      throw error;
    }
  }

  static async createUser(username: string, password: string, email: string, contact_name: string, role_id: number) {
    try {
      let existingUser = await UserModel.findUserByEmail(email) as ExistingUser;
      if (existingUser?.data?.length) {
        return { status: 'error', message: 'User with the provided email already exists.' };
      }

      // Insert a new user 
      return await insertFunction(
        'INSERT INTO users_login (username, password, email, contact_name, role_id) VALUES (?, ?, ?, ?,?)',
        [username, password, email, contact_name, role_id]
      );

    } catch (error) {
      logger.info('error', { message: error });
      throw error;
    }

  }

}

