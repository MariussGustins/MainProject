
$(document).ready(function() {
    var carousel = $('#carousel');
    // Set the interval between slides (in milliseconds)
    var interval = 3000;

    // Initialize the carousel
    $('.carousel').carousel({
        interval: interval
    });

    // Pause the carousel when the mouse is over it
    $('.carousel').hover(function() {
        $(this).carousel('pause');
    }, function() {
        $(this).carousel('cycle');
    });

    // Enable navigation through the carousel indicators
    $('.carousel-indicators li').click(function() {
        var targetSlide = $(this).data('slide-to');
        $('.carousel').carousel(targetSlide);
    });

    // Enable navigation through the carousel controls
    $('.carousel-control-prev').click(function() {
        $('.carousel').carousel('prev');
    });

    $('.carousel-control-next').click(function() {
        $('.carousel').carousel('next');
    });
});
