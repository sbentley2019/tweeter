$(document).ready(function() {
  let scrollCount = 0;

  $("#scroll-down-id").on("click", function() {
    if (scrollCount % 2 === 0) {
      $("html").animate({
        scrollTop: $('html')[0].scrollHeight}, 2000);
    } else {
      $("html").animate({
        scrollTop: 0 }, 2000);
      $("textarea").focus();
    }
    scrollCount++;
  });
});