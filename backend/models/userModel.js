import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'User must have a name'],
    },
    email: {
      type: String,
      required: [true, 'User must have an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'User must have a password'],
    },
    isAdmin: {
      type: Boolean,
      required: [true, 'User must have an admin property'],
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
