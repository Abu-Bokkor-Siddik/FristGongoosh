import express from 'express';
import { userController } from './user.controller';

const router= express.Router();


// will call controller function 
router.post('/create-user',userController.createUser);

export const UserRoute= router;