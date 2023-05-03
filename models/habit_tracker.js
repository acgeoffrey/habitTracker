const mongoose = require('mongoose');

const habitTrackerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      default: 'default@gmail.com',
    },
    habit: {
      type: String,
      required: true,
    },
    daysDone: [
      {
        date: String,
        completion: String,
      },
    ],
    starred: {
      type: Boolean,
      default: false,
    },
    LongestStreak: {
      type: Number,
    },
    daysFollowed: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const HabitTrackerApp = mongoose.model('HabitTrackerApp', habitTrackerSchema);
module.exports = HabitTrackerApp;
