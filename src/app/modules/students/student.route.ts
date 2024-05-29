import express, { NextFunction, Request, Response } from 'express';
import { Studentcontrollers } from './student.controller';
import { AnyZodObject } from 'zod';
const router= express.Router();


// will call controller function 
// router.post('/create-student',Studentcontrollers.createStudent);
//http://localhost:5000/api/v1/student

router.get('/',Studentcontrollers.getAllStudent)

// http://localhost:5000/api/v1/student/123456
router.get('/:studentId',Studentcontrollers.getSingleStudent)

export const StudentsRoute= router;