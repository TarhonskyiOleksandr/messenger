import mongoose, { Schema } from 'mongoose';

const UserShema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  constacts: [{
    type: Schema.Types.ObjectId,
    ref: 'Contact',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', UserShema);

export default User;
