import express from 'express'
import {getDonorsAndHospitals, loginUser, registerUser, updateProfile} from '../controller/userController.js'

const userRouter=express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.get('/donors',getDonorsAndHospitals)
userRouter.put('/update-profile',updateProfile)

export default userRouter;
