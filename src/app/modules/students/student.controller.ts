import { Request, Response } from "express";
import { StudentServices } from "./studentService";

// controller here 

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
    // createStudent,
    getAllStudent,
    getSingleStudent,

}