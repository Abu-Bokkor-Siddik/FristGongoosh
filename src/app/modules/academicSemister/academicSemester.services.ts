
import { AcademicSemester } from './academicSemester.model';
import { TAcademicSemester, } from './academicSemester.interface';
const createStudentSemisterIntoDB=async(payload:TAcademicSemester)=>{
// another way for type declire...map type
type TAcademicSemesterNameCodeMapper={
[key:string]:string;
}
 const academicSemesterNameCodeMapper:TAcademicSemesterNameCodeMapper = {
        Autumn:'01',
        Summar:'02',
        Fall:'03'
    }
    if (academicSemesterNameCodeMapper[payload.name] !==payload.code) {
        throw new Error('Invalid semester code');
    }
const result = await AcademicSemester.create(payload)
return result ;
}
const getAllAcademicSemestersFromDB = async () => {
    const result = await AcademicSemester.find();
    return result;
  };
  
  const getSingleAcademicSemesterFromDB = async (id: string) => {
    const result = await AcademicSemester.findById(id);
    return result;
  };
  
export const AcademicSemesterServices ={
    createStudentSemisterIntoDB,
    getAllAcademicSemestersFromDB,
    getSingleAcademicSemesterFromDB,
}