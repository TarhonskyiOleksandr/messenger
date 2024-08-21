import { Response } from 'express';

import Conversation from '../db/models/Conversation'
import Message from "../db/models/Message";
import { IProtectedRequest } from '../type';
import { io } from '../websocket';

import { usersOnline } from '../websocket/server';
import User from '../db/models/User';

export const sendMessage = async(req: IProtectedRequest, res: Response) => {
  try {
    const { id: receiverId } = req.params;
    const { message } = req.body;

    let conversation = await Conversation.findOne({
			participants: { $all: [req.userId, receiverId] },
		});
    let newConversation = null;

    if (!conversation) {
			conversation = await Conversation.create({
				participants: [req.userId, receiverId],
			});
      newConversation = await conversation.populate([
        {
          path: 'messages',
          options: { sort: { createdAt: -1 }, limit: 1 },
          model: Message,
        },
        {
          path: 'participants',
          select: 'userName',
          match: { _id: { $ne: req.userId }},
          options: { limit: 1 },
          model: User
        }
      ]);
      newConversation.toJSON();
		}

    const newMessage = new Message({
			senderId: req.userId,
      isSeen: false,
      conversationId: conversation._id,
			receiverId,
			message,
		});

    const lastMessage = await newMessage.populate('message', 'createdAt');

    const messageRes = {
      ...newMessage.toJSON(),
      conversation: newConversation && {
        user: newConversation?.participants[0],
        lastMessage
      }
    };

    console.log(messageRes)

    if (newMessage) conversation.messages.push(newMessage._id);

    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = usersOnline[receiverId];

		if (receiverSocketId) io.to(receiverSocketId).emit('message:new', messageRes);

    res.status(201).json(messageRes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const readMessage = async(req: IProtectedRequest, res: Response) => {
  const {
    messages,
    senderId,
    conversation,
  } = req.body;

  try {
    await Message.updateMany(
      { _id: { $in: messages } },
      { $set: { isSeen: true } }
    );

    const id = usersOnline[senderId];
    if (id) io.to(id).emit('message:seen', { messages, conversation });

    res.status(200).send({ messages, conversation });
  } catch (error) {
    res.status(500).send({ message: 'Failed to mark messages as seen', error });
  }
};

export const deleteMessage = async(req: IProtectedRequest, res: Response) => {
  const { id } = req.params;
  try {
    await Message.findByIdAndDelete(id);
    res.status(200).json({
      message: `message ${id} deleted`,
      id
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
