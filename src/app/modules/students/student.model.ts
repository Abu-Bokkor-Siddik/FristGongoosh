import { Schema, model, connect } from 'mongoose';
import { Guardian, LocalGuardian, Name, Student } from './studentInterface';
// Schema asese mongoose theke and <Student> holo interface... and type gula mongoosh ar String boro hater hobe...

// name
const userNameSchema =new Schema<Name>({
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  })
//   guardant 
const guardantSchema = new Schema<Guardian>({
    fatherName: {
      type: String,
      required: true,
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
  id: { type: String },
  name:userNameSchema,
  gender: ['male', 'female'],
  deathOfBirth: { type: String },
  email: { type: String, required: true },
  contact: { type: String, requiredL: true },
  emergencyNumber: { type: String, requiredL: true },
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian:guardantSchema,
  localGuardian:localGuardSchema,
  profileImg: { type: String },
  isActive: ['active', 'inactive'],
});


//  create a model 
 export const StudentsModel = model<Student>('Student',studentSchema)
