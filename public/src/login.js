// My Crappy JS Skills :/

$(".sign-in").on('click', function() {
  $(".button").addClass("expanded");
  $(".sign-in").addClass("hidden");
  $(".content").addClass("background");
  $("button").removeClass("hidden");
  $("form").toggleClass("hidden");
})
