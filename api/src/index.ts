import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { app, server } from './websocket';
import connectToDatabase from './db';
import router from './routes';

dotenv.config();

const corsConfig = {
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: 'Content-Type, Accepts, Authorization, Access-Control-Allow-Credentials',
  credentials: true,
};
const port = process.env.PORT || 8080;

app.use(cors(corsConfig));
app.use(express.json());
app.use(cookieParser());

app.use('/', router);

app.get('/ping', (req: Request, res: Response) => {
  res.status(200).send({ message: 'Express + TypeScript Server' });
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  connectToDatabase();
});
