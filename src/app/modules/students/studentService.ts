import httpStatus from "http-status";
import AppError from "../academicDepartment/academicDepartment.model";
import { StudentsModel } from "./student.model";
import mongoose from "mongoose";
import { UserModel } from "../user/user.model";
import { Student } from "./studentInterface";


// const createStudentDB= async (student:Student)=>{
//    const result= await StudentsModel.create(student);
//    return result;
// }
const getAllStudentFormDB= async(query:Record<string,unknown>)=>{
  // console.log()
    // HOW OUR FORMAT SHOULD BE FOR PARTIAL MATCH  : 
  //  { email: { $regex : query.searchTerm , $options: i}}
  //  { presentAddress: { $regex : query.searchTerm , $options: i}}
  //  { 'name.firstName': { $regex : query.searchTerm , $options: i}}
  let searchTerm = '';   // SET DEFAULT VALUE 
  const queryObj = { ...query }; // copying req.query object so that we can mutate the copy object 

  // IF searchTerm  IS GIVEN SET IT
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string; 
  }
  // here search query 
  const searchQuery = StudentsModel.find({
    $or: ['email','firstName','presentAddress'].map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
   })),
  })
   // FILTERING fUNCTIONALITY: 
  
   const excludeFields = ['searchTerm','sort','limit','page','fields'];
  //  delete searchTerm here 
   excludeFields.forEach((el) => delete queryObj[el]); 
   console.log(queryObj,'obj query ')
  //  here id filter 
    const FilterQuery = searchQuery.find(queryObj).populate('admissionSemester').populate({
        path:'academicDepartment',
        populate:{
            path:'academicFaculty'
        }
    });
    let sort ='-createdAt'
    if (query.sort) {
      sort= query?.sort as string;
    }
    // here sort 
    const sortQuery =FilterQuery.sort(sort)
    let page = 1;
    let limit = 1;
    let skip = 0;
    // age dibo karon aktai .. limit age ase paginatation nirbor shil
    if (query.limit) {
      limit = Number(query.limit);
    }
    if (query.page) {
      page = Number(query.page);
      skip=(page-1)*limit;
      
    }
    const paginateQuery = sortQuery.skip(skip)
    
 
const limitQuery = paginateQuery.limit(limit)
     // FIELDS LIMITING FUNCTIONALITY:
     let fields = '-__v'; // SET DEFAULT VALUE

     if (query.fields) {
       fields = (query.fields as string).split(',').join(' ');
   
     }
     const fieldQuery = await limitQuery.select(fields);
    return fieldQuery;
}
const getSingleStudentFormDB= async(id:string)=>{
const result = await StudentsModel.findOne({id});
    return result;
}
const deleteStudentFromDB = async (id: string) => {
    const session = await mongoose.startSession();
  
    try {
      session.startTransaction();
  
      const deletedStudent = await StudentsModel.findOneAndUpdate(
        { id },
        { isDeleted: true },
        { new: true, session },
      );
  
      if (!deletedStudent) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
      }
  
      const deletedUser = await UserModel.findOneAndUpdate(
        { id },
        { isDeleted: true },
        { new: true, session },
      );
  
      if (!deletedUser) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
      }
  
      await session.commitTransaction();
      await session.endSession();
  
      return deletedStudent;
    } catch (err) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error('Failed to delete student');
    }
  };
  const updateStudentIntoDB = async (id: string, payload: Partial<Student>) => {
    // out form data .. they are non premative 
    const { name, guardian, localGuardian, ...remainingStudentData } = payload;
  
    const modifiedUpdatedData: Record<string, unknown> = {
      ...remainingStudentData,
    };
  
    /*
      guardain: {
        fatherOccupation:"Teacher"
      }
  
      guardian.fatherOccupation = Teacher
  
      name.firstName = 'Mezba'
      name.lastName = 'Abedin'
    */
  
    if (name && Object.keys(name).length) {
      for (const [key, value] of Object.entries(name)) {
        modifiedUpdatedData[`name.${key}`] = value;
      }
    }
  
    if (guardian && Object.keys(guardian).length) {
      for (const [key, value] of Object.entries(guardian)) {
        modifiedUpdatedData[`guardian.${key}`] = value;
      }
    }
  
    if (localGuardian && Object.keys(localGuardian).length) {
      for (const [key, value] of Object.entries(localGuardian)) {
        modifiedUpdatedData[`localGuardian.${key}`] = value;
      }
    }
  
    console.log(modifiedUpdatedData);
  
    const result = await StudentsModel.findOneAndUpdate({ id }, modifiedUpdatedData, {
      new: true,
      runValidators: true,
    });
    return result;
  };
  
// export 
export const StudentServices={
// createStudentDB,
getAllStudentFormDB,
getSingleStudentFormDB,
deleteStudentFromDB,
updateStudentIntoDB,
}