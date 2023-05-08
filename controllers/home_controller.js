const Habit = require('../models/habit_tracker');
const User = require('../models/user');

function daysDateStats() {
  let today = new Date().toLocaleDateString('en-GB').split('/').join('-');
  function last7Dates() {
    return '0123456'.split('').map(function (n) {
      var d = new Date();
      d.setDate(d.getDate() - n);

      return (function (day, month, year) {
        if (day < 10) {
          day = '0' + day;
        }
        if (month < 10) {
          month = '0' + month;
        }
        return [[year, month, day].join('-'), [day, month, year].join('-')];
      })(d.getDate(), d.getMonth() + 1, d.getFullYear());
    });
  }

  let last7D = last7Dates();

  function last7Days() {
    let gsDayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    let arr = [];
    for (let i = 0; i < last7D.length; i++) {
      let d = new Date(last7D[i][0]);
      let dayName = gsDayNames[d.getDay()];
      // console.log(dayName);
      arr.push(dayName);
    }
    return arr;
  }

  return {
    today: today,
    seven_dates: last7Dates(),
    seven_days: last7Days(),
  };
  // console.log(obj);
  // return obj;
}

module.exports.home = async (req, res) => {
  try {
    //getting user and habit to render data on views
    const habit = await Habit.find({}).sort({ starred: -1, time: 1 }).exec();
    const user = await User.findOne({ email: 'default@gmail.com' });

    return res.render('home', {
      title: 'Habit Tracker App',
      habits: habit,
      date: daysDateStats(),
      view: user.view,
    });
  } catch (err) {
    console.log(err);
  }
};
