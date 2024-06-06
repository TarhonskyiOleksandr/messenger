import { Response } from 'express';

import User from '../db/models/User';
import { IProtectedRequest } from '../type';

export const getCurrentUser = async(req: IProtectedRequest, res: Response) => {
  try {
    const currentUser = await User.findById(req.userId);

    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { _id, email, userName } = currentUser;

    return res.status(200).json({ user: { _id, email, userName } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateUser = async(req: IProtectedRequest, res: Response) => {
  try {
    if (req.userId) return res.status(400).json({ message: 'Missing user ID' });

    const data = await User.findOneAndUpdate(
      { _id: req.userId },
      req.body,
      { new: true }
    );

    if (!data) return res.status(404).json({ message: 'User not found' });

    return res.status(200).json({ message: 'Successfully updated', data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const usersSearch = async(req: IProtectedRequest, res: Response) => {
  try {
    const { userName } = req.body;
    const data = await User.findOne({ userName }).select('userName');

    if (!data) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
