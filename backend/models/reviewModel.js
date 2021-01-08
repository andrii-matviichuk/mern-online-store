import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must have belong to a user'],
    },
    rating: {
      type: Number,
      required: [true, 'Review must have a rating'],
    },
    comment: {
      type: String,
      required: [true, 'Review must have a comment'],
    },
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);

export default Review;
