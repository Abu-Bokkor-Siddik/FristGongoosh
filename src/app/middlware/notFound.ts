
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction } from 'express';
import express, { Request, Response } from 'express';
import httpStatus from 'http-status';
export const notFound = (
 
  req: Request,
  res: Response,
  next: NextFunction,
) => {
    
  return res.status(httpStatus.NOT_FOUND).json({
   
    success: false,
    message:'api not Found'
    
  });
};