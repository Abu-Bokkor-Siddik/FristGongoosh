
import { Schema, model, connect, Types } from 'mongoose';
export type Guardian={
    fatherName:string;
    fatherOccupation: string;
    fatherContactNo:string;
    motherName:string;
    motherOccupation:string;
    motherContactNo: string;
}

export type Name={
    firstName:string;
    middleName:string;
    lastName:string;
}
export type LocalGuardian={
    name:Name;
    contact: string;
    Occupation: string;
   address:string;
}
export type Student = {
    id:string;
    user:Types.ObjectId,
  name:Name;
  gender:"male"|"female";
  deathOfBirth:string;
  email: string;
  contact: string;
  emergencyNumber: string;
  bloodGroup?:'A+'|'A-'|'B+'|'B-'|'AB+'|'AB-'|'O+'|'O-';
  presentAddress:string;
  permanentAddress:string;
  guardian:Guardian;
  localGuardian:LocalGuardian;
  profileImg?:string;
  
};
