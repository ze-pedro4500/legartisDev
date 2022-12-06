$(document).ready(function(){
  $(".media-appearances-wp .outter").slice(0, 6).show();
  if($(".media-appearances-wp .outter").size() < 6) {
      $(".media-appearance-sec #loadMore").css('display', 'none');
  }
  $(".media-appearance-sec #loadMore").on("click", function(e){
    e.preventDefault();
    $(".media-appearances-wp .outter:hidden").slice(0, 6).slideDown();
    if($(".media-appearances-wp .outter:hidden").length == 0) {
      $(".media-appearance-sec #loadMore").css('display', 'none');
    }
  });
  
});