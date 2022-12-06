$('.logo-v2-slider .logo-v2-wp').slick({
  dots: false,
  infinite: true,
  speed: 800,
  arrows:true,
  slidesToShow:4 ,
  slidesToScroll: 2,
  responsive: [
    {
      breakpoint: 701,
      settings: {
        slidesToShow:2 ,
        slidesToScroll: 2
      }
    }
  ]

});


$(document).ready(function(){

  var $this = $('.logo-v2-wp');
  //   if ($this.find('div').length > 2) {
  //     $('.logo-v2-wp').after('<div><a href="javascript:;" class="showMore"></a></div>');
  //   }

  // If more than 2 Education items, hide the remaining
  $('.logo-v2-wp .logo-box2.col-5').slice(0,10).addClass('shown');
  $('.logo-v2-wp .logo-box2.col-5').not('.shown').hide();
  $(' .show_More').on('click',function(){
    $('.logo-v2-wp .logo-box2.col-5').not('.shown').toggle(1000);
    $(this).toggleClass('show_Less');
  });
  if ($(".logo-v2-wp .logo-box2.col-5:hidden").length == 0) {
    $(".load-more-btn").fadeOut("slow");
  } else {
    $(".load-more-btn").fadeIn("slow");
  }
});