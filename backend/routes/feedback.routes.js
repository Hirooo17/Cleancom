import express from 'express';
import { createFeedback, deleteFeedback, getUserFeedback, updateFeedback } from '../controller/feedback.controller.js';


const feedbackRouter = express.Router();


feedbackRouter.post('/create-feedback',createFeedback);
feedbackRouter.get('/get-user-feedback/:userId', getUserFeedback);
feedbackRouter.put('/update-feedback/:id', updateFeedback);
feedbackRouter.delete('/delete-feedback/:id', deleteFeedback);

export default feedbackRouter;