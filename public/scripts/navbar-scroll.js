$(document).ready(function() {
  let scrollCount = 0;

  $("#scroll-down").on("click", function() {
    //A click function for the scroll icon in navbar. Scrolls to screen bottom on even scrollCount and screen top otherwise.  
    if (scrollCount % 2 === 0) {
      $("html").animate({
        scrollTop: $('html')[0].scrollHeight}, 2000);
    } else {
      $("html").animate({
        scrollTop: 0 }, 2000);
    }
    scrollCount++;
  });
});