


// const express = require('express')
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentsRoute } from './app/modules/students/student.route';
import { UserRoute } from './app/modules/user/useer.route';
import { globalErrorHandler } from './app/middlware/globalErrorHandler';
import { notFound } from './app/middlware/notFound';
import { AcademicSemesterRoutes } from './app/modules/academicSemister/academicSemester.route';

const app: Application = express();
// const port = 3000
app.use(express.json());
app.use(cors());
// application router will here ..
// /api/v1/student/create-student
app.use('/api/v1/student', StudentsRoute);
app.use('/api/v1/users', UserRoute);
app.use('/api/v1/semesters', AcademicSemesterRoutes);

app.get('/', (req:Request, res: Response) => {
  res.send('hello world');
});
app.use(globalErrorHandler)
app.use(notFound)
export default app;
