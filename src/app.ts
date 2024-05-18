// const express = require('express')
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentsRoute } from './app/modules/students/student.route';

const app: Application = express();
// const port = 3000
app.use(express.json());
app.use(cors());
// application router will here ..
// /api/v1/student/create-student
app.use('/api/v1/student', StudentsRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('hello world');
});
export default app;
