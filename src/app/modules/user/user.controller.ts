import { Request, Response } from "express";
import { UserServics } from "./user.services";

// controller here 
const createUser = async (req:Request,res:Response)=>{
    try {
      // data unte pari ... param , query, req.body 
      const {password,student:studentData} = req.body;
      // console.log(studentData)
      // will call service function to send this data ..
  const result = await UserServics.createUserDB(password,studentData);
  res.status(200).json({
      success:true,
      message:"student create successfully",
      data:result,
  })
    } catch (error) {
     console.log(error)
    }
 }
 export const userController ={
  createUser
 }