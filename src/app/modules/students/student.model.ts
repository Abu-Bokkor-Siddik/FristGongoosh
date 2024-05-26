import { Schema, model, connect } from 'mongoose';
import { Guardian, LocalGuardian, Name, Student } from './studentInterface';
// Schema asese mongoose theke and <Student> holo interface... and type gula mongoosh ar String boro hater hobe...

// name
const userNameSchema =new Schema<Name>({
    firstName: {
      type: String,
      required: [true,'first name in must'],//buildtin validation
    },
    middleName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: [true,'last name in must'],
    },
  })
//   guardant 
const guardantSchema = new Schema<Guardian>({
    fatherName: {
      type: String,
      required: true,
      trim:true,
      maxlength:[20,'name leanth must not be 20'],
    },
    fatherOccupation: {
      type: String,
      required: true,
    },
    fatherContactNo: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
      required: true,
    },
    motherOccupation: {
      type: String,
      required: true,
    },
    motherContactNo: {
      type: String,
      required: true,
    },
  })
//   local guardant 
const localGuardSchema= new Schema <LocalGuardian>({
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    Occupation: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  })
const studentSchema = new Schema<Student>({
  id: { type: String ,required:true,unique:true},
  user:{
    type:Schema.Types.ObjectId,
    required:[true,'user is required'],
    unique:true,
    ref:'User',
  },
  name:{type:userNameSchema,required:true},
  gender: {
    type:String,
    enum:{
      values:['male', 'female','other'],
      message:'this data is required '
    },
    required:true
  },
  deathOfBirth: { type: String },
  email: { type: String, required: true ,unique:true},
  contact: { type: String, requiredL: true },
  emergencyNumber: { type: String, requiredL: true },
  bloodGroup: {
    type:String,
    enum:['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required:true,
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian:{type:guardantSchema,required:true},
  localGuardian:{type:localGuardSchema,required:true},
  profileImg: { type: String },
  
});


//  create a model 
 export const StudentsModel = model<Student>('Student',studentSchema)
