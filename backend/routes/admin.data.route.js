import express from "express";
import adminAuth from "../middleware/admin.auth.js";
import getAdminData from "../controller/admin.controller.js";


const adminDataRouter = express.Router();

adminDataRouter.get('/admin-data', adminAuth, getAdminData);

export default adminDataRouter;