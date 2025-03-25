import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const port = 5000;

app.use(express.json());
app.get('/', (req, res) => {
  console.log(req);
  return res.status(200).send('Hello World!');
});


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});