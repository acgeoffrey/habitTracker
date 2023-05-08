'use strict';
console.log('Script is loaded!');
{
  //To show and hide the input form div for creating habit
  $('#add-habit').click(function () {
    $('.create-habit-div').removeClass('hidden');
    $('#add-habit').addClass('hidden');
  });

  $('.create-habit-div').click(function (e) {
    if (e.target != this) {
      return;
    }
    $('.create-habit-div').addClass('hidden');
    $('#add-habit').removeClass('hidden');
  });
}
