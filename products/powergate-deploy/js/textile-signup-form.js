if ($('.textile-signup-form').length) {
  $('.textile-signup-form').parsley().on('field:validated', function () {
    var ok = $('.parsley-error').length === 0;
    $('.bs-callout-info').toggleClass('hidden', !ok);
    $('.bs-callout-warning').toggleClass('hidden', ok);
  });

  $('.textile-signup-form').submit(function (e) {
    $('body').addClass('form-success');
    setTimeout(function () {
      $(".customer-comments").css("display", "none");
    }, 300);
    $('.get-started').fadeOut(300);
    setTimeout(function () {
      $(".sent-email-box").fadeIn(300);
    }, 500);

    e.preventDefault();
  });
}