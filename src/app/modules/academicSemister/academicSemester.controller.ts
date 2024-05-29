import { NextFunction, Request, Response } from "express";
import { AcademicSemesterServices } from "./academicSemester.services";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendRsponse";
import httpStatus from "http-status";


// controller here 
const createAcademicSemeste = async (req:Request,res:Response,next:NextFunction)=>{
    try {
      const result = await AcademicSemesterServices.createStudentSemisterIntoDB(req.body)

  res.status(200).json({
      success:true,
      message:"student create successfully",
      data:result,
  })
    } catch (error) {
    next(error)
    }
 }

//  all semesters 
const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemestersFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semesters are retrieved successfully',
    data: result,
  });
});
// single semester .
const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result =
    await AcademicSemesterServices.getSingleAcademicSemesterFromDB(semesterId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is retrieved succesfully',
    data: result,
  });
});
 export const AcademicSemesterControllers ={
    createAcademicSemeste,
    getAllAcademicSemesters,
    getSingleAcademicSemester,

 }