import { addDonor, addHospital, deleteDonor, deleteHospital, getDonors,getHospitals, updateDonor, updateHospital } from "../controller/adminController.js";
import express from 'express'

const adminRouter=express.Router();

adminRouter.get('/admin-donors',getDonors);
adminRouter.get('/admin-hospitals',getHospitals);
adminRouter.delete('/admin-donors/:id',deleteDonor)
adminRouter.delete('/admin-hospitals/:id',deleteHospital)
adminRouter.put('/admin-donors/:id',updateDonor)
adminRouter.put('/admin-hospitals/:id',updateHospital)
adminRouter.post('/admin-donors',addDonor)
adminRouter.post('/admin-hospitals',addHospital)

export default adminRouter