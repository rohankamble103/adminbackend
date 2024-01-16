import * as mysql from 'mysql2';
import 'dotenv/config';

export const userPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || '10',10),
    connectTimeout: 100000, 
    multipleStatements: true
});

// export const userPool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'Tech@3005',
//     database: 'erp_login',
//     connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || '10',10),
//     connectTimeout: 80000, 
//     multipleStatements: true
// });
