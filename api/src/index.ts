import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from "socket.io";

import connectToDatabase from './db';
import router from './routes';

dotenv.config();

const corsConfig = {
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: 'Content-Type, Accepts, Authorization, Access-Control-Allow-Credentials',
  credentials: true,
};

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(cors(corsConfig));
app.use(express.json());
app.use(cookieParser());

app.use('/', router);

const userSocketMap: any = {};

app.get('/ping', (req: Request, res: Response) => {
  res.status(200).send({ message: 'Express + TypeScript Server' });
});

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: process.env.CLIENT_URL,
		methods: ["GET", "POST"],
	},
});

io.on('connection', (socket) => {
  console.log('user conected')
  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId as string] = socket.id;
  io.emit("getUsersOnline", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
		delete userSocketMap[userId as string];
		io.emit("getUsersOnline", Object.keys(userSocketMap));
	});
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

connectToDatabase();
