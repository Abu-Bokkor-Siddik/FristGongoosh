import { Request, Response } from "express";
import { StudentServices } from "./studentService";

// controller here 
const createStudent = async (req:Request,res:Response)=>{
   try {
     // data unte pari ... param , query, req.body 
     const {student:studentData} = req.body;
     console.log(studentData)
     // will call service function to send this data ..
 const result = await StudentServices.createStudentDB(studentData);
 res.status(200).json({
     success:true,
     message:"student create successfully",
     data:result,
 })
   } catch (error) {
    console.log(error)
   }
}
// getallstudent
const getAllStudent = async (req:Request,res:Response)=>{
try {
    const result = await StudentServices.getAllStudentFormDB();
    res.status(200).json({
        success:true,
        message:"all student here ",
        data:result,
    })

} catch (error) {
    console.log(error)
}
}
// get single student 
const getSingleStudent = async (req:Request,res:Response)=>{
    try {
        const {studentId} = req.params;
        console.log(studentId)
        const result = await StudentServices.getSingleStudentFormDB(studentId);
        res.status(200).json({
            success:true,
            message:"Single student here ",
            data:result,
        })
    
    } catch (error) {
        console.log(error)
    }
    }
// export 
 export const Studentcontrollers = {
    createStudent,
    getAllStudent,
    getSingleStudent,

}