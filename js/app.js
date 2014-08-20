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
  $('nav a').click(function(e) {
    // Don't perform the default action.
    e.preventDefault();
    // Get the name of the element we are looking for
    var position = $(this).attr('href').substr(1);
    console.log(position);
    // Get the position of the named element on the page.
    var positionToScroll = $('#' + position).position();
    // Animate the scroll to the position.
    $('html,body').animate({
      scrollTop: positionToScroll.top
    }, 700);
  });

  /**
   * Page Loading Events
   */
  // Events to fire when the page has fully loaded.
  $(window).bind("load", function() {
    // Add the loaded class when the page has fully loaded.
    $('body').addClass('loaded');
    // Curve the main intro text on an arc
    $("h1.intro-title").arctext({radius: 2500});
    $("h2.intro-title").arctext({radius: 1000});
    // Initialize the cats
    initializeCats();
    // Initialize the slider
    $('.flexslider').flexslider({
      animation: "slide"
    });
  });

}(jQuery));
