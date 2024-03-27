$(function () {
  $(window).scroll(function () {
    $(".slideanim").each(function () {
      let pos = $(this).offset().top;
      if (pos < $(window).scrollTop() + 200) {
        $(this).addClass("slide");
      }
    });
  });
});
