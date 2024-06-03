/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction } from 'express';
import express, { Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSource } from '../error/error.interface';
import config from '../config';
import { handleZodError } from '../error/handleZodError';
import handleValidationError from '../error/handleValidationError';
import handleCastError from '../error/handleCastError';
import handleDuplicateError from '../error/handleDuplicateError';
import AppError from '../modules/academicDepartment/academicDepartment.model';
export const globalErrorHandler:ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  // deafult babe ata 
  let statusCode = 500;
  let message = 'some Thing is wrong';
  // // type costume formate source 
  // type TErrorSource ={
  //   path:string|number;
  //   message:string;
  // }[]

let errorSource :TErrorSource=[{
  path:'',
 message:'some Thing is wrong'
}]
// handleZodError function  cut in errorHandlezod


if (error instanceof ZodError) {
  // formate here it will recive 
  const simplifiedError =handleZodError(error)
  statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSources;
}else if (error?.name === 'ValidationError') { //mongoose error handle 
  const simplifiedError = handleValidationError(error);
  statusCode = simplifiedError?.statusCode;
  message = simplifiedError?.message;
  errorSource = simplifiedError?.errorSources;
}else if (error?.name === 'CastError') {
  const simplifiedError = handleCastError(error);
  statusCode = simplifiedError?.statusCode;
  message = simplifiedError?.message;
  errorSource = simplifiedError?.errorSources;
} else if (error?.code === 11000) {
  const simplifiedError = handleDuplicateError(error);
  statusCode = simplifiedError?.statusCode;
  message = simplifiedError?.message;
  errorSource = simplifiedError?.errorSources;
}else if (error instanceof AppError) {
  statusCode = error?.statusCode;
  message = error.message;
  errorSource = [
    {
      path: '',
      message: error?.message,
    },
  ];
}else if (error instanceof Error) {
  message = error.message;
  errorSource = [
    {
      path: '',
      message: error?.message,
    },
  ];
}
  return res.status(statusCode).json({
    // res will here
    success: false,
    message,
    errorSource,
    // error,
    // checking for stack if development show or hide null
    stack: config.NODE_ENV==='development'? error?.stack:null,
    // error,
  });
};
