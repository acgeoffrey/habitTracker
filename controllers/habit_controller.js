const HabitTracker = require('../models/habit_tracker');
const User = require('../models/user');

module.exports.create = async (req, res) => {
  try {
    let user = await User.findOne({ email: 'default@gmail.com' });
    if (!user) {
      user = await User.create({
        email: 'default@gmail.com',
      });
    }
    let findHabit = await HabitTracker.findOne({ habit: req.body.habit });
    if (findHabit) {
      req.flash('error', 'Habit already exists!');
      return res.redirect('back');
    }
    let daysDone = [];
    let dateNow = new Date().toLocaleDateString('en-GB').split('/').join('-');
    daysDone.push({ date: dateNow, completion: 'None' });

    const createHabit = await HabitTracker.create({
      email: user.email,
      habit: req.body.habit,
      daysDone: daysDone,
      time: req.body.time,
    });
    req.flash('success', 'New Habit Created. Good Luck!');

    return res.redirect('back');
  } catch (err) {
    console.log(err);
  }
};

module.exports.updateCompletion = async (req, res) => {
  try {
    const habit = await HabitTracker.findById(req.params.id);
    let daysDone = habit.daysDone;
    let isHabitDone = false;

    daysDone.find(function (a, index) {
      if (a.date == req.params.date) {
        if (a.completion == 'Done') {
          a.completion = 'Not Done';
          req.flash('error', 'Habit marked as Not Done!');
        } else {
          a.completion = 'Done';
          req.flash('success', 'Habit marked as Done!');
        }
        isHabitDone = true;
      }
    });
    if (!isHabitDone) {
      daysDone.push({ date: req.params.date, completion: 'Done' });
      req.flash('success', 'Habit marked as Done');
    }
    habit.daysDone = daysDone;
    await habit.save();
    console.log(habit);
    return res.redirect('back');
  } catch (err) {
    console.log(err);
  }
};

module.exports.updateStarred = async (req, res) => {
  try {
    const habit = await HabitTracker.findById(req.params.id);
    habit.starred = habit.starred ? false : true;
    habit.save();
    console.log(habit);
    return res.redirect('back');
  } catch (err) {
    console.log(err);
  }
};

module.exports.destroy = async (req, res) => {
  try {
    const habit = await HabitTracker.findById(req.params.id);
    habit.deleteOne();
    req.flash('success', 'Habit deleted successfully!');
    res.redirect('back');
  } catch (err) {
    console.log(err);
  }
};

module.exports.changeView = async (req, res) => {
  try {
    const user = await User.findOne({ email: 'default@gmail.com' });
    user.view = req.params.view;
    user.save();
    return res.redirect('back');
  } catch (err) {
    console.log(err);
  }
};
