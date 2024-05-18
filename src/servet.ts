import app from './app';
import config from './app/config';
import dotenv from 'dotenv';

// const mongoose = require('mongoose');
import mongoose from 'mongoose';
dotenv.config();

// console.log('DATABASE_URL:', config.database_URL);
// console.log('DATABASE_URL:', config.port);
main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect(config.database_URL as string);
    // await mongoose.connect(
    //   'mongodb+srv://admin_url:c3BXlPMHlIsEPwOp@cluster0.kkqbu90.mongodb.net/frist_project?retryWrites=true&w=majority&appName=Cluster0',
    // );

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// main();
