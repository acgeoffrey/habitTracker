'use strict';
console.log('Script is loaded!');
{
  $('#daily-view-icon').click(function () {
    $('#daily-view').removeClass('hidden');
    $('#weekly-view').addClass('hidden');
    $(this).css('backgroundColor', 'white');
    $('#weekly-view-icon').css('backgroundColor', 'rgba(255, 255, 255, 0)');
  });
  $('#weekly-view-icon').click(function () {
    $('#weekly-view').removeClass('hidden');
    $('#daily-view').addClass('hidden');
    $(this).css('backgroundColor', 'white');
    $('#daily-view-icon').css('backgroundColor', 'rgba(255, 255, 255, 0)');
  });

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
