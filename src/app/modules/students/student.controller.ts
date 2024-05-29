import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './studentService';
import { sendResponse } from '../../utils/sendRsponse';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';

// controller here
// and here is a high order function ....
// const catchAsync = (fn: RequestHandler) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     Promise.resolve(fn(req, res, next)).catch((error) => next(error));
//   };
// };

// getallstudent
const getAllStudent: RequestHandler = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentFormDB();
  // costom middleware
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'all student here',
    data: result,
  });
  // res.status(200).json({
  //     success:true,
  //     message:"all student here ",
  //     data:result,
  // })
});
// get single student
const getSingleStudent = catchAsync(async (
    req: Request,
    res: Response,
    
  ) => {
   
      const { studentId } = req.params;
      console.log(studentId);
      const result = await StudentServices.getSingleStudentFormDB(studentId);
      res.status(200).json({
        success: true,
        message: 'Single student here ',
        data: result,
      });
    
  });
// export
export const Studentcontrollers = {
  // createStudent,
  getAllStudent,
  getSingleStudent,
};
