const mongoose = require('mongoose');

const habitTrackerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
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
    time: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const HabitTrackerApp = mongoose.model('HabitTrackerApp', habitTrackerSchema);
module.exports = HabitTrackerApp;
