/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction } from 'express';
import express, { Request, Response } from 'express';
export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = 500;
  const message = error.message || 'some Thing is wrong';
  return res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};
