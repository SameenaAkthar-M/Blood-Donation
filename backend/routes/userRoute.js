import express from 'express'
import {getDonorsAndHospitals, loginUser, registerUser} from '../controller/userController.js'

const userRouter=express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.get('/donors',getDonorsAndHospitals)

export default userRouter;
