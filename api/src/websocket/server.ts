import express, { Express } from 'express';
import http from 'http';
import { Server, Socket } from "socket.io";

interface IOnlineStorage {
  [key: string]: string;
}

interface IUserSubs {
  [key: string]: Set<string>;
}

const app: Express = express();
export const usersOnline: IOnlineStorage = {};
export const userSubs: IUserSubs = {};

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: '*',
	},
  transports: ['websocket', 'polling'],
});

const disconnect = async(id: string, socket: Socket) => {
  userSubs[id]?.forEach((sub) => {
    if (usersOnline[sub]) {
      socket.to(usersOnline[sub]).emit('user:update_status', { [id]: 'offline' });
    }
  });
  delete usersOnline[id];
  delete userSubs[id];
  // io.emit('user:update_status', { [id]: 'offline' });
};

const onConnection = async(socket: Socket) => {
  const id = socket.handshake.query.userId as string;
  if (!id) return;
  usersOnline[id] = socket.id;
  userSubs[id] = userSubs[id] || new Set();
  io.emit('user:update_status', { [id]: 'online' });

  socket.on('user:check_status', ({ userId, sub }) => {
    const isSubscribed = userSubs[userId]?.has(sub);
    if (!isSubscribed) userSubs[userId]?.add(sub);
    io.emit('user:update_status', { [sub]: usersOnline[sub] ? 'online' : 'offline' });
  });

  socket.on('message:typing', (data) => {
    const receiver = usersOnline[data.id];
    if (!receiver) return;
    socket.to(receiver).emit('message:typing', data);
  })

  socket.on('user:remove_sub', ({ id, sub }) => userSubs[id]?.delete(sub));

  socket.on('disconnect', () => disconnect(id, socket));
};

io.on('connection', onConnection);

export { app, server, io };
