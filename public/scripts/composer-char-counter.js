$(document).ready(function() {
  $('.new-tweet textarea').on('keyup', function() {
    if (this.value.length > 140) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', '#545149');
    }
    $(this).siblings('.counter').text(140 - (this.value.length));
  });
});