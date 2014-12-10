// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

// Attach fastclick to the body
FastClick.attach(document.body);

// jQuery specific functionality for the front end.
(function ($) {

  /**
   * Cats Section
   */

  // Cats peeking in/out of the viewport.
  var initializeCats = function() {
    $('.cat')
    .waypoint(function(direction) {
      switch(direction) {
        case 'down':
          $(this).parent().addClass('peek');
          break;
        case 'up':
          $(this).parent().removeClass('peek expand');
          break;
      }
    }, { offset: '80%' })
    .waypoint(function(direction) {
      switch(direction) {
        case 'down':
          $(this).parent().removeClass('peek expand');
          break;
        case 'up':
          $(this).parent().addClass('peek');
          break;
      }
    }, { offset: '10%' })
    // Click handler to expand peeking cat.
    .click(function(e) {
      e.preventDefault();
      $(this).parent().toggleClass('expand');
    });
  };

  /**
   * Handle top menu click scrolling
   */
  $('nav a[href!="#"]').click(function(e) {
    console.log(e);
    console.log(this);
    // On mobile, uncheck the checkbox to hide the mobile menu.
    $('input#show-menu').attr('checked', false);
    // Get the name of the element we are looking for
    var position = $(this).attr('href').substr(1);
    // Get the position of the named element on the page.
    var positionToScroll = $('#' + position).position();
    // Animate the scroll to the position.
    $('html,body').animate({
      scrollTop: positionToScroll.top
    }, 700);
  });
  var $menuCheckbox = $('input#show-menu');
  // Handle edge case issue with mobile logo overtop of menu item
  $('.logo-mobile').click(function() {
    if ($menuCheckbox.prop('checked') == true) {
      $menuCheckbox.prop('checked', false);
    } else {
      $menuCheckbox.prop('checked', true);
    }
  });

  /**
   * RSVP form
   */

  // Show the RSVP form when a button is clicked.
  var position;
  $("a[data-modal='rsvp']" ).click(function(e){
    e.preventDefault();
    position = $(window).scrollTop();
    $('#rsvp').addClass('open');
    $('input#show-menu').attr('checked', false);
    setTimeout(function(){
      $('.main-container').addClass('hide');
    }, 1000);
  })
  // Hide the RSVP form when a button is clicked.
  $("a.rsvp-close").click(function(e) {
    e.preventDefault();
    $('.main-container').removeClass('hide');
    $('body').scrollTop(position);
    $('#rsvp').removeClass('open');
  });

  // Add/remove for items based on what is selected.
  $("#rsvp form input").change(function(e) {
    var element = $(this).attr('id');

    switch(element) {
      case 'going':
        $('#your-details').addClass('show');
        $('.radio-group.plusone').addClass('show');
        $('#your-details .your-details-going').addClass('show');
        break;

      case 'not-going':
        $('#your-details').addClass('show');
        $('.radio-group.plusone').removeClass('show');
        $('#plusone-details').removeClass('show');
        $('#your-details .your-details-going').removeClass('show');
        break;

      case 'no-plusone':
        $('#plusone-details').removeClass('show');
        break;

      case 'plusone':
        $('#plusone-details').addClass('show');
        break;
    }
  });

  // Ladda instantiation for button animation.
  var l = $('#rsvp button.rsvp-submit').ladda();

  // Submit button handler for validation.
  $("#rsvp button.rsvp-submit").click(function(e) {
    e.preventDefault();
    var going = $('input[name=going]:checked', '#rsvp').val();
    var plusone = $('input[name=plusone]:checked').val();
    var $form = $('#rsvp form');
    var valid = false;
    switch (going) {
      case 'yes':
        if (plusone === 'yes') {
          valid = $form.parsley().validate('going-plusone');
        } else {
          valid = $form.parsley().validate('going');
        }
        break;

      case 'no':
        valid = $form.parsley().validate('not-going');
        break;

      default:
        valid = $form.parsley().validate('going');
    }

    if (valid) {
      mailCurrentForm(going, plusone);
    }
  });

  var mailCurrentForm = function(going, plusone) {
    // Start the button animation.
    l.ladda( 'start' );
    // Initialize the text variables.
    var email = "rsvp@singlahabib.com";
    var name = $('input[name=guest-name]', '#rsvp').val();
    var subject = "RSVP from " + name;
    var body = "Name: " + name + "<br/>";
    if (going === 'yes') {
      body += "Going: Yes<br/>";
      body += "Address: " + $('input[name=guest-address]', '#rsvp').val() + "<br/>";
      body += "Meal: " + $('input[name=guest-meal]:checked', '#rsvp').val() + "<br/>";
      if ($('textarea[name=guest-notes]', '#rsvp').val()) {
        body += "Notes: " + $('textarea[name=guest-notes]', '#rsvp').val() + "<br/>";
      }
      if (plusone === 'yes') {
        body += "Plus 1: Yes<br/>";
        body += "Guest Name: " + $('input[name=plusone-name]', '#rsvp').val() + "<br/>";
        body += "Guest Meal: " + $('input[name=plusone-meal]:checked', '#rsvp').val() + "<br/>";
      } else {
        body += "Plus 1: No<br/>";
      }
    } else {
      body += "Going: No<br/>";
      if ($('textarea[name=guest-notes]', '#rsvp').val()) {
        body += "Notes: " + $('textarea[name=guest-notes]', '#rsvp').val() + "<br/>";
      }
    }
    $.ajax(
    {
      type: "POST",
      url: "https://mandrillapp.com/api/1.0/messages/send.json",
      data: {
        'key': '444nOhDtNECZLeNBUr-8Sg',
        'message': {
          'from_email': email,
          'from_name': name,
          'headers': {
            'Reply-To': email
          },
          'subject': subject,
          'html': body,
          'to': [
          {
            'email': email,
            'name': 'Caroline & Arvin',
            'type': 'to'
          }]
        }
      }
    })
    .done(function(response) {
      document.cookie="rsvp=true";
      $.ladda( 'stopAll' );
      $("#rsvp form").addClass('hide');
      $('#rsvp-thankyou').addClass('animate-in');
      setTimeout(function(){
        $("a.rsvp-close").trigger('click');
      }, 1500);
    })
    .fail(function(response) {
      $.ladda( 'stopAll' );
      $("#rsvp form").hide();
      $('#rsvp-error').addClass("animate-in");
    });
  }

  // Move it move it trigger.
  var moveit_count = 0;
  $('a.move-it-trigger').click(function(e) {
    e.preventDefault();
    if (!moveit_count) {
      $('.move-it-player').append('<audio controls><source src="misc/move-it-move-it.mp3" type="audio/mpeg">Your browser does not support the audio element.</audio>').fadeIn();
      moveit_count++;
    }
  });

  // Perform table sorting
  $("#search-text").keyup(function () {

    $.extend($.expr[':'], {
      'containsi': function(elem, i, match, array) {
        return (elem.textContent || elem.innerText || '').toLowerCase()
        .indexOf((match[3] || "").toLowerCase()) >= 0;
      }
    });

    //split the current value of searchInput
    var data = this.value.split(" ");
    //create a jquery object of the rows
    var jo = $("#table-items").find("tr");
    if (this.value == "") {
        jo.show();
        return;
    }
    //hide all the rows
    jo.hide();

    //Recusively filter the jquery object to get results.
    jo.filter(function (i, v) {
        var $t = $(this);
        for (var d = 0; d < data.length; ++d) {
            if ($t.is(":containsi('" + data[d] + "')")) {
                return true;
            }
        }
        return false;
    })
    //show the rows that match.
    .show();
  })

  /**
   * Page Loading Events
   */
  // Events to fire when the page has fully loaded.
  $(window).bind("load", function() {
    // Curve the main intro text on an arc
    $("h1.intro-title").arctext({radius: 2500});
    $("h2.intro-title").arctext({radius: 1000});
    // Initialize the cats
    initializeCats();
    // Initialize the slider
    $('.flexslider').flexslider({
      animation: "slide",
      pauseOnAction: true,
      pauseOnHover: true,
      useCSS: true,
      start: function() {
        $.waypoints('refresh');
      }
    });
    var myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)rsvp\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (myCookie) {
      $('#rsvp form').addClass('hide');
      $('#rsvp-thankyou').addClass('animate-in');
    }
    // Add the loaded class when the page has fully loaded.
    $('body').addClass('loaded');
  });

}(jQuery));
