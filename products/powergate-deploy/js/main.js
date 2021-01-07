//

if ($('.swiper-container').length) {
  var customerComments = new Swiper('.customer-comments', {
    slidesPerView: 1,
    speed: 1500,
    fadeEffect: { crossFade: true },
    effect: "fade",
    autoplay: {
      delay: 5000,
    },
  });
}

if ($('select').length) {
  $('select').selectric();
}

if ($('.phone-input').length) {
  $('.phone-input').mask('+00 000 000 00 00');
}