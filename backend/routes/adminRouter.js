import { deleteDonor, deleteHospital, getDonors,getHospitals } from "../controller/adminController.js";
import express from 'express'

const adminRouter=express.Router();

adminRouter.get('/admin-donors',getDonors);
adminRouter.get('/admin-hospitals',getHospitals);
adminRouter.delete('/admin-donors/:id',deleteDonor)
adminRouter.delete('/admin-hospitals/:id',deleteHospital)

export default adminRouter