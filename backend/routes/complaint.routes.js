// complaint.routes.js

import express from 'express';

import userAuth from '../middleware/user.auth.js';
import { createComplaint } from '../controller/complaint.controller.js';

const complaintRouter = express.Router();

// Submit a new complaint
complaintRouter.post('/create', userAuth, createComplaint)

export default complaintRouter;
