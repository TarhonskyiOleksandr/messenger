import { Response } from 'express';

import { IProtectedRequest } from '../type';
import Conversation from '../db/models/Conversation';
import User from '../db/models/User';
import Message from '../db/models/Message';


export const getConversations = async(req: IProtectedRequest, res: Response) => {
  try {
    const conversations = await Conversation.find(
      { participants: req.userId }
    )
    .populate({
      path: 'participants',
      match: { _id: { $ne: req.userId }},
      options: { limit: 1 },
      select: 'userName',
      model: User
    })
    .populate({
      path: 'messages',
      select: ['message', 'createdAt'],
      options: { sort: { createdAt: -1 }, limit: 1 },
      model: Message
    });

    const response = conversations.map((c) => ({
      id: c._id,
      user: c.participants[0],
      lastMessage: c.messages[0]
    }));

    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getConversation = async(req: IProtectedRequest, res: Response) => {
  try {
    const conversation = await Conversation.findOne({
      participants: req.userId,
      _id: req.params.id
    })
    .populate({
      path: 'participants',
      match: { _id: { $ne: req.userId }},
      options: { limit: 1 },
      select: '_id',
      model: User
    })
    .populate({
      path: 'messages',
      select: ['message', 'createdAt', 'senderId'],
      model: Message
    });

    if (!conversation) res.status(404).json('Not Found!');

    const response = {
      id: conversation?._id,
      reciever: conversation?.participants[0],
      messages: conversation?.messages,
    };

    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
