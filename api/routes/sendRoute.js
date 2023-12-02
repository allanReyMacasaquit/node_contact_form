import express from 'express';
import { sendEmail } from '../controllers/sendController.js';

const sendRoute = express.Router();

sendRoute.post('/send', sendEmail);

export default sendRoute;
