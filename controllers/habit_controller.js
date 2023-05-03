const HabitTracker = require('../models/habit_tracker');

module.exports.create = async (req, res) => {
  try {
    let daysDone = [];
    let dateNow = new Date().toLocaleDateString('en-GB').split('/').join('-');
    daysDone.push({ date: dateNow, completion: 'None' });

    const createHabit = await HabitTracker.create({
      habit: req.body.habit,
      daysDone: daysDone,
    });

    console.log(createHabit);
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
        } else {
          a.completion = 'Done';
        }
        isHabitDone = true;
      }
    });
    if (!isHabitDone) {
      daysDone.push({ date: req.params.date, completion: 'Done' });
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
    res.redirect('back');
  } catch (err) {
    console.log(err);
  }
};
