import dotenv from 'dotenv';
// import dotenv from 'dotenv';

import path from 'path';
dotenv.config({ path: path.join((process.cwd(), '.env')) });

// check
// console.log(process.cwd());

export default {
  port: process.env.PORT,
  database_URL: process.env.DATABASE_URL,
};
