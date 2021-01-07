if ($('.request-access__form').length) {

    // var analytics = window.analytics = window.analytics || []; if (!analytics.initialize) if (analytics.invoked) window.console && console.error && console.error("Segment snippet included twice."); else {
    //   analytics.invoked = !0; analytics.methods = ["identify"];
    //   analytics.factory = function (e) {
    //     return function () { var t = Array.prototype.slice.call(arguments); t.unshift(e); analytics.push(t); return analytics }
    //   };
    //   for (var e = 0; e < analytics.methods.length; e++) {
    //     var key = analytics.methods[e]; analytics[key] = analytics.factory(key)
    //   }
    //   analytics.load = function (key, e) {
    //     var t = document.createElement("script"); t.type = "text/javascript"; t.async = !0; t.src = "https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js"; var n = document.getElementsByTagName("script")[0]; n.parentNode.insertBefore(t, n); analytics._loadOptions = e
    //   }; analytics.SNIPPET_VERSION = "4.13.1";
    //   analytics.load("99f7Bq2r2vm3Kl0Ar6Jq5shlospq7M1j");
    // }

  var $sections = $('.request-access__form-block');

  function navigateTo(index) {
    $sections
      .removeClass('current')
      .fadeOut(200)
      .eq(index)
      .addClass('current')
      .fadeIn(1000);
    var atTheEnd = index >= $sections.length - 1;
    $('.request-access__form-navigation .next').toggle(!atTheEnd);
    $('.request-access__form-navigation .done').toggle(atTheEnd);
  }

  function curIndex() {
    return $sections.index($sections.filter('.current'));
  }

  var $myForm = $('.request-access__form');

  $('.request-access__form .done').click(function () {
    $('.request-access__form').parsley().whenValidate({
      group: 'block-' + curIndex()
    }).done(function () {
      $myForm.find('.done').attr("disabled", true);
      var data = {};
      $myForm.serializeArray().map(function(x){data[x.name] = x.value;}); 
      $.ajax({
        url: "https://pow-request.textile-user-token-0.workers.dev/",
        type: 'post',
        dataType: 'json',
        data: JSON.stringify(data),
        success: function() {
          console.log('SUCCESS');
          $('body').addClass('form-success');
          setTimeout(function () {
            $(".customer-comments").css("display", "none");
          }, 300);
          $('.request-access').fadeOut(300);
          setTimeout(function () {
            $(".sent-email-box").fadeIn(300);
          }, 500);
        }
      })
      // analytics.identify({
      //   name: $myForm.find('input[name="name"]').val(),
      //   country: $myForm.find('select').val(),
      //   url: $myForm.find('input[name="url"]').val(),
      //   details: $myForm.find('textarea[name="details"]').val(),
      //   email: $myForm.find('input[name="email"]').val(),
      //   powergate_request: $myForm.find('input[name="powergate_request"]').val()
      // }, function() {
      // });
    });
  });

  $('.request-access__form-navigation .next').click(function () {
    $('.request-access__form').parsley().whenValidate({
      group: 'block-' + curIndex()
    }).done(function () {
      navigateTo(curIndex() + 1);
    });
  });

  $sections.each(function (index, section) {
    $(section).find(':input').attr('data-parsley-group', 'block-' + index);
  });
  navigateTo(0);
}

if ($('#get-started-btn').length) {
  $('#get-started-btn').click(function (e) {

    $('.get-started').fadeOut(200);
    $('.request-access').fadeIn(1000);

    e.preventDefault();
  });
}