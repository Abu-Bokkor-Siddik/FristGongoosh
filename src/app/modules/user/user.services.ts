import { AcademicSemester } from './../academicSemister/academicSemester.model';
import { TAcademicSemester } from './../academicSemister/academicSemester.interface';
import config from '../../config';
import { TAcademicSemesterCode } from '../academicSemister/academicSemester.interface';
import { StudentsModel } from '../students/student.model';
import { Student } from '../students/studentInterface';
import { NewUsers, TUser } from './user.interface';
import { UserModel } from './user.model';
import { generateStudentId } from './user.utils';
import mongoose from 'mongoose';
import AppError from '../academicDepartment/academicDepartment.model';
import httpStatus from 'http-status';

const createUserDB = async (password: string, studentData: Student) => {
   // create a empty object  
   // new way to define type partial optional
   // console.log(config.password_default,'default password')
   const Users:Partial<TUser>={}
   //   in one line
Users.password= password|| (config.password_default as string)
   // if password is not given use default password .
   // if (!password) {
   //    password= config.password_default as string;
   // }
   Users.role='student';
// set manually id  automatic by next mission 


// find academic semester info ..
 // find academic semester info
 const admissionSemester = await AcademicSemester.findById(
   studentData.admissionSemester,
 );
//  transation apply here in module 13 
const session = await mongoose.startSession();
 try {
   // start transaction ...
   session.startTransaction();
   Users.id= await generateStudentId(admissionSemester)
//  note its not a good pactices because 2 ta collection a write koresii.. 


   // create a user  first transection part 1 
   
  const resultUser = await UserModel.create([Users],{session});//age silo object akhon array ...
//   check successfully user create and has id and _id 
if (!resultUser.length) {
   throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
 }
   studentData.id = resultUser[0].id;
   studentData.user= resultUser[0]._id;
   // new student data create transatation 2 
   const newStudent = await StudentsModel.create([studentData],{session});
   if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    await session.commitTransaction();
    await session.endSession();
   return newStudent;

   
 } catch (error) {
   await session.abortTransaction();
   await session.endSession();
   throw new Error('Failed to create student');
 }
 
  
};

export const UserServics = {
  createUserDB,
};
