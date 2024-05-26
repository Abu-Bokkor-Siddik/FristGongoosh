import config from '../../config';
import { StudentsModel } from '../students/student.model';
import { Student } from '../students/studentInterface';
import { NewUsers, TUser } from './user.interface';
import { UserModel } from './user.model';

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
 Users.id= '20003400040'
//  note its not a good pactices because 2 ta collection a write koresii.. 
   // create a user  first 
  const resultUser = await UserModel.create(Users);
//   check successfully user create and has id and _id 
if (Object.keys(resultUser).length) {
   studentData.id = resultUser.id;
   studentData.user= resultUser._id;
   // new student data create 
   const newStudent = await StudentsModel.create(studentData);
   return newStudent;
}
  
};

export const UserServics = {
  createUserDB,
};
