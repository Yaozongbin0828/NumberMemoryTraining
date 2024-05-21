$(function () {
  $(".tab-menu li").click(function () {
    let target = $(this).data("target");
    $(".tab-menu li").removeClass("active");
    $(this).addClass("active");
    $(".tab-content").removeClass("active");
    $("#" + target).addClass("active");
  });
});
