// from http://api.$.com/$.getScript/
$.cachedScript = function(url, options) {

  // allow user to set any option except for dataType, cache, and url
  options = $.extend(options || {}, {
    dataType: "script",
    cache: true,
    url: url
  });

  // Use $.ajax() since it is more flexible than $.getScript
  // Return the jqXHR object so we can chain callbacks
  return $.ajax(options);
};

(function(){
  // Code highlighting
  $('pre').addClass('prettyprint');
  $.cachedScript('/js/prettify.js', {
    success: function() {
      prettyPrint();
    }
  });

  var $listingLinks = $('.listing-link'),
      waitThreshold = 5;

  if ($listingLinks.length > 0) {
    padListLinksWhenFontsLoad($listingLinks, waitThreshold);
  }
})();

function padListLinks($listingLinks) {
  $listingLinks.each(function(i) {
    var backgroundWidth = 9,
        gapBetweenDots = 5,
        width = $(this).width(),
        mod = width % backgroundWidth;

    if (mod < gapBetweenDots) {
      $(this).css('padding-right', gapBetweenDots);
    }
  });
}

function fontsHaveLoaded() {
  return $('html').is('.wf-active') || $('html').is('.wf-inactive');
}

function padListLinksWhenFontsLoad($listingLinks, waitThreshold) {
  if (fontsHaveLoaded() || waitThreshold > 5) {
    padListLinks($listingLinks);
  } else {
    waitThreshold++;
    setTimeout(function() {
      padListLinksWhenFontsLoad($listingLinks, waitThreshold);
    }, 100);
  }
}
