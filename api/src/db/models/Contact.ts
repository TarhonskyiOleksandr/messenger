import mongoose, { Schema } from 'mongoose';

const ContactShema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model('Contact', ContactShema);

export default Contact;
