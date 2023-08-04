import mongoose from 'mongoose';
import { z } from 'zod';

const userSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(3),
  photo: z.string().optional(),
  role: z.enum(['user', 'admin']).default('user'),
});

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    role: {
      type: String,
      default: 'user',
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  try {
    const validatedData = userSchema.parse(this.toObject());
    return next();
  } catch (error) {

    return next(error);
  }
});

export default mongoose.model('User', UserSchema);