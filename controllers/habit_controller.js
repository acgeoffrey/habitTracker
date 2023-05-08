const HabitTracker = require('../models/habit_tracker');
const User = require('../models/user');

/*** Create a new habit ***/
module.exports.create = async (req, res) => {
  try {
    let user = await User.findOne({ email: 'default@gmail.com' });
    if (!user) {
      //Creating a new user
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

    //Get the date string
    let dateNow = new Date().toLocaleDateString('en-GB').split('/').join('-');
    daysDone.push({ date: dateNow, completion: 'None' });

    //create a new habit
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

/*** Update the completion status of a habit ***/
module.exports.updateCompletion = async (req, res) => {
  try {
    const habit = await HabitTracker.findById(req.params.id);
    let daysDone = habit.daysDone;
    let daysFollowed = habit.daysFollowed;
    let isHabitDone = false;

    daysDone.find(function (a, index) {
      if (a.date == req.params.date) {
        if (a.completion == 'Done') {
          a.completion = 'Not Done';
          if (daysFollowed > 0) {
            daysFollowed -= 1;
          }
          req.flash('error', 'Habit marked as Not Done!');
        } else {
          a.completion = 'Done';
          daysFollowed += 1;
          req.flash('success', 'Habit marked as Done!');
        }
        isHabitDone = true;
      }
    });

    //register a new date, thats not in database already
    if (!isHabitDone) {
      daysDone.push({ date: req.params.date, completion: 'Done' });
      daysFollowed += 1;
      req.flash('success', 'Habit marked as Done');
    }
    habit.daysDone = daysDone;
    habit.daysFollowed = daysFollowed;
    await habit.save();

    // let streak = 0;
    // for (let i = 0; i < habit.daysDone.length; i++) {
    //   if (
    //     habit.daysDone[i].completion == 'Not Done' ||
    //     habit.daysDone[i].completion == 'None'
    //   ) {
    //     break;
    //   } else if (habit.daysDone[i].completion == 'Done') {
    //     streak += 1;
    //   }
    // }

    // habit.LongestStreak = streak;
    // await habit.save();

    console.log(habit);
    return res.redirect('back');
  } catch (err) {
    console.log(err);
  }
};

/*** Update the favorites status of a habit ***/
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

/*** Delete a habit ***/
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
/*** To change the view ***/
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
