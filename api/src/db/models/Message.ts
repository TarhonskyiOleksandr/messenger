import mongoose, { Schema } from 'mongoose';

const MessageShema = new Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Message = mongoose.model('Message', MessageShema);

export default Message;
