$(document).ready(function(){
  $('.logo-slider').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    responsive: [
      {
        breakpoint:992,
        settings: {
          rows: 2,
          slidesToShow: 3
        }
      },
    ]
  });
  var size = $(".logo-slider-mobile .slider-logo-box");
  for(var i = 0; i < size.length; i += 2) {
    size.slice(i, i + 2).wrapAll("<div class='outter-wrapper'></div>"); 
  }
  $('.logo-slider-mobile').slick({

    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    arrows: true
  });
});