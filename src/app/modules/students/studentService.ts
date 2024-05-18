import { StudentsModel } from "./student.model";
import { Student } from "./studentInterface";

const createStudentDB= async (student:Student)=>{
   const result= await StudentsModel.create(student);
   return result;
}
const getAllStudentFormDB= async()=>{
    const result = await StudentsModel.find();
    return result;
}
const getSingleStudentFormDB= async(id:string)=>{
const result = await StudentsModel.findOne({id});
    return result;
}
// export 
export const StudentServices={
createStudentDB,
getAllStudentFormDB,
getSingleStudentFormDB,
}