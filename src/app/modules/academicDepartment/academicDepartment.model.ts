import { Schema, model } from 'mongoose';

import { TAcademicDepartment } from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
);
//  class error 
class AppError extends Error{
  public statusCode :number;
  constructor(statusCode:number,message:string,stack=''){
    super(message);
    this.statusCode=statusCode;
    if (stack) {
      this.stack=stack;
    }else{
      Error.captureStackTrace(this,this.constructor)
    }
  }
}
academicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExist = await AcademicDepartment.findOne({
    name: this.name,
  });

  if (isDepartmentExist) {
    throw new AppError(404,'This department is already exist!');
  }

  next();
});

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  // get query id here ...
  const query = this.getQuery();

  const isDepartmentExist = await AcademicDepartment.findOne(query);

  if (!isDepartmentExist) {
    throw new Error('This department does not exist! ');
  }

  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
export default AppError;