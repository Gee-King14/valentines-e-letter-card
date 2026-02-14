$(document).ready(function() {
            // Handle Yes/No popup buttons
            $(document).on('click', '#popup-yes', function() {
                // Fade out popup letter
                $('#popup').fadeOut(600, function() {
                    // Hide overlay background, show ticket popup
                    $('#ticket-popup').fadeIn(600);
                });
            });
            $(document).on('click', '#popup-no', function() {
                $(this).text('yes');
            });

            // Hide ticket popup when clicked
            $(document).on('click', '#ticket-popup', function() {
                $('#ticket-popup').fadeOut(600, function() {
                    // Restore popup for future opens
                    $('#popup').show();
                    hidePopup();
                });
            });
        // Floating hearts from below the page
        function randomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        function createFloatingHeart() {
            var colors = ['red1','red2','red3','red4','red5','red6'];
            var color = colors[randomInt(0, colors.length-1)];
            var left = randomInt(5, 95); // percent
            var size = randomInt(22, 38); // px
            var dur = randomInt(4200, 6500); // ms
            var $heart = $('<div class="floating-heart ' + color + '"></div>');
            $heart.css({
                left: left + 'vw',
                width: size + 'px',
                height: (size * 1.6) + 'px',
                opacity: 0.85,
                animationDuration: (dur/1000) + 's',
            });
            $('.floating-hearts').append($heart);
            setTimeout(function() {
                $heart.remove();
            }, dur + 1000);
        }
        setInterval(createFloatingHeart, 700);
    var envelope = $("#envelope");
    var btn_open = $("#open");
    var btn_reset = $("#reset");
    var overlay = $("#overlay");
    var popupLetter = $("#popup-letter");
    var btn_closePopup = $("#closePopup");

    envelope.click(function() {
        open();
    });
    btn_open.click(function() {
        open();
    });
    btn_reset.click(function() {
        close();
    });

    // close popup when clicking overlay background
    overlay.on('click', function(e) {
        if (e.target === this) {
            hidePopup();
        }
    });
    btn_closePopup.on('click', function(e) {
        e.stopPropagation();
        hidePopup();
    });

    function open() {
        envelope.addClass("open")
            .removeClass("close");
        showPopup();
    }

    function close() {
        envelope.addClass("close")
            .removeClass("open");
        hidePopup();
    }

    function showPopup() {
        // Always show popupLetter and hide ticket-popup before showing popup
        $('#popup').show();
        $('#ticket-popup').hide();
        // Reset Yes/No button text
        setTimeout(function() {
            $('#popup-yes').text('Yes');
            $('#popup-no').text('No');
        }, 0);
        // Use the separate popup letter content
        var popupContent = $('#popup-letter-content').html();
        popupLetter.html(popupContent);
        overlay.attr('aria-hidden', 'false').addClass('show');
        $('body').addClass('no-scroll');
    }

    function hidePopup() {
        overlay.removeClass('show').attr('aria-hidden','true');
        // wait for transition end before clearing content
        overlay.one('transitionend webkitTransitionEnd oTransitionEnd', function() {
            popupLetter.empty();
        });
        $('body').removeClass('no-scroll');
    }

})