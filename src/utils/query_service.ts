import { userPool as pool } from '../db/userDB';
import { logger } from '../middleware/requestLogger';
let currentDate = new Date();

export const selectFunction = (qry: string) => {
  return new Promise((resolve, reject) => {
    let params: any[] = [];
    logger.info('Request start ==========================', { message: currentDate });
    pool.query(qry, params, function (this: { sql: string }, err: any, queryResult: any) {
      logger.info('query--', { message: this.sql });
      if (err) {
        logger.info('err--', { message: err });
        console.log("err in select", err);
        logger.info('Request end ==========================', { message: currentDate });
        return reject({ status: 'error', data: err });
      } else {
        logger.info('Request end ==========================', { message: currentDate });
        resolve({ status: 'success', data: queryResult });
      }
    });
  });
};

export const insertFunction = (qry:string, params: any[]) => {
  return new Promise((resolve, reject) => {
    let query =  qry;
    logger.info('Request start ==========================', { message: currentDate });
    pool.query(query, params, function (this: { sql: string }, err:any, queryResult:any) {
      logger.info('query--', { message: this.sql });
      if (err) {
        logger.info('err--', { message: err });
        console.log("err in Insert", err);
        logger.info('Request end ==========================', { message: currentDate });
        return reject({status: 'error', data: err});
      } else {
        logger.info('Request end ==========================', { message: currentDate });
        resolve({status: 'success', data: queryResult});
      }
    });
  })  
}

export const updateFunction = (table_name:string, setValue :string, condition: string) => {
  return new Promise((resolve, reject) => {
    var query = `update ${table_name} SET ${setValue} where ${condition}`;
    var params:any = [];
    logger.info('Request start ==========================', { message: currentDate });
    pool.query(query, params, function (this: { sql: string }, err, queryResult) {
      logger.info('query--', { message: this.sql });
      if (err) {
        logger.info('err--', { message: err });
        console.log(err);
        logger.info('Request end ==========================', { message: currentDate });
        return reject({status: 'error', data: err});
      } else {
        logger.info('Request end ==========================', { message: currentDate });
        resolve({status: 'success', data: queryResult});
      }
    });
  })
}

export const deleteFunction = (table_name:string, condition:string) => {
  return new Promise((resolve, reject) => {
    var query = `delete from ${table_name} where ${condition}`;
    var params:any = [];
    logger.info('Request start ==========================', { message: currentDate });
    pool.query(query, params, function (this: { sql: string }, err, queryResult) {
      logger.info('query--', { message: this.sql });
      if (err) {
        logger.info('err--', { message: err });
        console.log(err);
        logger.info('Request end ==========================', { message: currentDate });
        return reject({status: 'error', data: err});
      } else {
        logger.info('Request end ==========================', { message: currentDate });
        resolve({status: 'success', data: queryResult});
      }
    });
  })
}