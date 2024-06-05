import express, { Express } from 'express';
import http from 'http';
import { Server, Socket } from "socket.io";

import { client } from '../redis';

const app: Express = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: '*',
	},
});

const disconnect = async(id: string) => {
  await client.del(id);
  const res = await client.keys('*');
  io.emit('user:get_users_online', res);
};

const onConnection = async(socket: Socket) => {
  const id = socket.handshake.query.userId as string;
  if (!id) return;
  await client.set(id, socket.id);
  const res = await client.keys('*');
  io.emit('user:get_users_online', res);
  socket.on('disconnect', () => disconnect(id));
};

io.on('connection', onConnection);

export { app, server, io };
