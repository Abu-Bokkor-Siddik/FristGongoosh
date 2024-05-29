import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
import { createStudentValidationSchema } from '../students/student.validation';
import { AnyZodObject } from 'zod';

const router= express.Router();

// this is middleware we use it for vallidation 
export const validateRequest = (schema:AnyZodObject)=>{
    
    return async(req:Request,res:Response,next:NextFunction)=>{
        // console.log(req.body)
        try {
            await schema.parseAsync({
                body:req.body,

            });
            next()
        } catch (error) {
             next(error)
        }
    }
}
// will call controller function 
router.post('/create-user',validateRequest(createStudentValidationSchema),userController.createUser);

export const UserRoute= router;