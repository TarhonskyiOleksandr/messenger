import { Response } from 'express';

import Conversation from '../db/models/Conversation'
import Message from "../db/models/Message";
import { IProtectedRequest } from '../type';
import { io } from '../websocket';

import { usersOnline } from '../websocket/server';

export const sendMessage = async(req: IProtectedRequest, res: Response) => {
  try {
    const { id: receiverId } = req.params;
    const { message } = req.body;

    let conversation = await Conversation.findOne({
			participants: { $all: [req.userId, receiverId] },
		});

    if (!conversation) {
			conversation = await Conversation.create({
				participants: [req.userId, receiverId],
			});
		}

    const newMessage = new Message({
			senderId: req.userId,
      conversationId: conversation._id,
			receiverId,
			message,
		});

    if (newMessage) conversation.messages.push(newMessage._id);

    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = usersOnline[receiverId];

		if (receiverSocketId) io.to(receiverSocketId).emit('message', newMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// export const getMessages = async(req: IProtectedRequest, res: Response) => {
//   try {
//     const { id: conversationId } = req.params;

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// };
