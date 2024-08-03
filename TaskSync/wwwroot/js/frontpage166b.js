var fc = fc || {};
var freezeVp = function(e) {
    e.preventDefault();
};
function stopBodyScrolling (bool) {
    if (bool === true) {
        document.body.addEventListener("touchmove", freezeVp, false);
    } else {
        document.body.removeEventListener("touchmove", freezeVp, false);
    }
}
function dropdownToggleCallback(action) {
    if (fc.isMobileVersion) {
        if (action === "open") {
            stopBodyScrolling(true);
            $("html").addClass("dropdown_opened");
        } else {
            stopBodyScrolling(false);
            $("html").removeClass("dropdown_opened");
        }
    }
    $("#hero #login_username").click().focus();
}
$(function(){
    var quotes = [
        {
            quote: "Freedcamp is amazing stuff. I use it everyday and it helps me to maintain my sanity. Highly recommended for those juggling projects.",
            author: "Eric Hilliard",
            username: "erichilliard",
            avatar: cdn_front_url + "images/quotes/erichil.jpg",
            link: "https://twitter.com/erichilliard"

        },
        {
            quote: "We love your product and are so glad we can help spread the news!",
            author: "Intellitonic‏",
            username: "Intellitonic",
            avatar: cdn_front_url + "images/quotes/intellitonic.jpg",
            link: "https://twitter.com/Intellitonic"

        },
        {
            quote: "I am crushing on Freedcamp, the free project management tool. Organize any group activity today with ease.",
            author: "Lisa Laskey Parks",
            username: "fit_is_ageless",
            avatar: cdn_front_url + "images/quotes/lisa.jpg",
            link: "https://twitter.com/fit_is_ageless"

        },{
            quote: "I'm loving @Freedcamp! Best project management system yet! #designergoals",
            author: "Rebecca Smetak",
            username: "rsdesigncreativ",
            avatar: cdn_front_url + "images/quotes/rebecca.jpg",
            link: "https://twitter.com/rsdesigncreativ"

        },
        {
            quote: "The best Project Management App is: Freedcamp, I absolutely love them",
            author: "Milan Vuk Stankovic",
            username: "LanmiDCS",
            avatar: cdn_front_url + "images/quotes/milan.jpg",
            link: "https://twitter.com/LanmiDCS"

        },
        {
            quote: "Freedcamp is the market leader and we are proud to be a part of your community!",
            author: "Michael Peters",
            username: "NewJerseySPCA",
            avatar: cdn_front_url + "images/quotes/njspca.jpg",
            link: "https://twitter.com/NewJerseySPCA"

        }
    ];
    var quotes2 = [
        {
            quote: "Shout out to @Freedcamp - we've been using it for about a week and love it!",
            author: "SECOND STORY",
            username: "2ndstoryagency",
            avatar: cdn_front_url + "images/quotes/secondstory.jpg",
            link: "https://twitter.com/2ndstoryagency"

        },
        {
            quote: "Started using @Freedcamp for project management.  Love it!",
            author: "Troy Coroles",
            username: "TroyCoroles",
            avatar: cdn_front_url + "images/quotes/troy.jpeg",
            link: "https://twitter.com/TroyCoroles"

        },
        {
            quote: "PM and QA are my passion, and it is a pleasure to use Freedcamp. Thank you @Freedcamp team for all your support and generous reward!",
            author: "Robert Okadar",
            username: "araneanetwork",
            avatar: cdn_front_url + "images/quotes/robert.jpeg",
            link: "https://twitter.com/araneanetwork"

        },
        {
            quote: "My new favorite FREE project management software. Freedcamp.com",
            author: "Tina Sullivan",
            username: "TinaPSullivan",
            avatar: cdn_front_url + "images/quotes/tina.jpeg",
            link: "https://twitter.com/TinaPSullivan"

        }
    ];
    $.autocapitalize();
    fkit.initiatePlugins();
    var $template = $(".reviews .review").clone();
    var $reviews = $(".reviews");
    $("#all_reviews").on("click", ".load_more", function(e){
        e.preventDefault();
        show_more_clicked = true;
        loadTweets(quotes2);
        // $.extend( configList, { "maxTweets": 20 } );
        // twitterFetcher.fetch(configList);
    });
    var show_more_clicked = false;
    function loadTweets(quotes) {
        if (!show_more_clicked) {
            $reviews.html("");
        }
        for (var i = 0; i < quotes.length; i++) {
            var $new_template = $template.clone();
            $new_template.find(".message").text(quotes[i].quote);
            $new_template.find(".avatar").css({"background-image":"url("+quotes[i].avatar+")"});
            $new_template.find(".first_last").text(quotes[i].author);
            $new_template.find(".twitter").attr("href", quotes[i].link).text("@" + quotes[i].username);
            $reviews.append($new_template);
            //if (!show_more_clicked) {
                $new_template.addClass("animate");
            //}
        }
        if (!show_more_clicked) {
            setWayPoints();
        } else {
            $(".load_more").remove();
        }
    }
    setTimeout(function(){
        loadTweets(quotes);
    },300);


    $(".quick_add_project_name").on("click",function(){
            var $th = $(this);
            $("#project_name").val($th.find(".spaced_text").text());
            $("#project_name").focus();
    });

    function showLoadingScreenOverlay() {
        $('.fc_home_loading_screen').css('display', 'flex')
            .hide()
            .fadeIn(function () {
                setTimeout(function () {
                    setTimeout(function () {
                        $('.fc_task_popover_single').first().addClass('donedone');
                    }, 1000);
                    setTimeout(function () {
                        $('.fc_task_popover_single:nth-of-type(2)').addClass('donedone');
                    }, 3900);
                    setTimeout(function () {
                        $('.fc_task_popover_single:nth-of-type(3)').addClass('donedone');
                    }, 6700);
                }, 500);
            });
    }
    function hideLoadingScreenOverlay() {
        $('.fc_home_loading_screen').hide();
        $('.fc_task_popover_single.donedone').removeClass('donedone');
    }

    $(".register_form").submit(function(e){
        e.preventDefault();
        
        if (!$(".a_js_token").length) {
            var t = $('input[name=a_token]');
            if (t.length) {
                var val = t.first().val();
                t.parents('form').append("<input class='a_js_token' type='hidden' name='a_js_token' value='" + val + "'>");
            }
        }

        var $th = $(this);
        var entered_email = $th.find('input[name=email]');
        var entered_email_val = entered_email.val();
        if(!fc.validateEmail(entered_email_val)) {
            entered_email.addClass("error").parents(".field").addClass("error_field")
                .parents(".group").addClass("error_group");
            entered_email.focus();
            return;
        }
        showLoadingScreenOverlay();
        var url = base_url + "register";
        ajaxRequest(url, $th.serializeFormJSON(), function(response) {
            if (response.data.f_error) {
                hideLoadingScreenOverlay();
                $th[0].processErrors(response.data.errors,true);
                if (response.message) {
                    alert(response.message);
                }
                return;
            }
            window.location = response.data.redirect_to;
        });
    });
    
    if ($(".first_last").val() !== "") {
        $(".register_form").submit();
    }
    var scroll_when = [
        { elem: "#features_tasks .section_title", add_to: "#features_tasks .section_title", offset: 50},
        { elem: "#features_tasks .feature_column_left", add_to: "#features_tasks .feature_column_left,#features_tasks .browser-container", offset: 650},
        { elem: "#register_follow_up .section_inner", add_to: "#register_follow_up .section_inner", offset: 200},
        { elem: "#features_apps .section_title", add_to: "#features_apps .section_title", offset: 100},
        { elem: "#features_apps .feature_column_left", add_to: "#features_apps .feature_column_left,#features_apps .browser-container", offset: 880},
        { elem: "#mobile .mobile_content", add_to: "#mobile .mobile_content,#mobile .iphone, #mobile .app-icon", offset: 300},
        { elem: "#features_modules .section_title", add_to: "#features_modules .section_title", offset: 30},
        { elem: "#features_modules .feature_list", add_to: "#features_modules .feature_list .feature", offset: 460},
        { elem: "#main_user_review .section_inner", add_to: "#main_user_review .section_inner", offset: 100},
        { elem: "#all_reviews .section_title", add_to: "#all_reviews .section_title", offset: 30},
        { elem: "#all_reviews .reviews", add_to: "#all_reviews .review", offset: 461},
        { elem: "#register_final .section_inner", add_to: "#register_final .section_inner", offset: 30},
        { elem: "footer .section_inner", add_to: "footer .section_inner", offset: 10}
    ];
    function isElementInViewport (el, offset) {
        var $el = el;
        if (typeof jQuery === "function" && el instanceof jQuery) {
            el = el[0];
        }
        if (typeof el === "undefined")
            return;
        var rect = el.getBoundingClientRect();
        return (rect.top + offset >= 0 &&
        rect.left >= 0 &&
        rect.bottom - offset <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth));
    }
    function addAnimateClass($elem, $animate, offset) {
        if ( isElementInViewport($elem, offset) && !$animate.hasClass("animate")) {
            $animate.addClass("animate");
        }
        $(window).scroll(function() {
            if ( isElementInViewport($elem, offset) && !$animate.hasClass("animate") ) {
                $animate.addClass("animate");
            }
        });
    }
    function setWayPoints() {
        for ( var i = 0; i < scroll_when.length; i++ ) {
            addAnimateClass($(scroll_when[i].elem), $(scroll_when[i].add_to), scroll_when[i].offset);
        }
    }

    $(".feature_toggle").each(function(){
        var self = this;
        self.$th = $(this);
        self.$feature_list = self.$th.find(".feature_list");
        self.$browser = self.$th.find(".feature_screenshot_list");
        self.$feature_list.on("click", ".feature", function(e){
            self.$browser.find("li").hide();
            self.$feature_list.find("li").removeClass("active");
            $(this).addClass("active");
            self.$browser.find("li").eq($(this).index()).css({"display":"block"}).addClass("animate");
        });
        self.$feature_list.find("li:first-child").click();
    });

    $(".go_to_signup").on("click", function(e){
        e.preventDefault();
        var $scroll_to = fc.isMobileVersion ? $("#register .register_form") : $("#hero");
        var offset_to = fc.isMobileVersion ? -20 : 100;
        $('html, body').animate({
            scrollTop: $scroll_to.offset().top + offset_to
        }, 700);
        $("#hero .email").focus();
    });
    $(".go_to_login").on("click", function(e){
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $("#hero").offset().top
        }, 700);
        setTimeout(function(){
            $(".login .fkit_dropdown_activate").trigger("click");
            $("#hero #login_username").focus();
        },650);
    });
    $("a.contact, .contact_support_now").on("click",function(e){
        e.preventDefault();
        showContact($(this));
    });
    // Hide contact form
    $(document).on("click", "a.close_popup", function(e) {
        e.preventDefault();
        hideContact();
    });

    var contact_popup_orig_top = 0;
    function showContact(elem) {
        var url = base_url + "get_contact";
        var location = elem.hasClass('contact') ? 'footer' : 'header';

        if($('.contact_dialog').length) {//already loaded
            $('.contact_lighten, .contact_darken').fadeIn(400);
            $('#contact').show();
            $('#contact_success').hide();
            setContactPopupStyles(location, elem);
            $('.contact_dialog').fadeIn(400);
            return true;
        }

        ajaxRequest(url, {}, function(response) {
            $('body').prepend(response.data.html);
            $('.contact_lighten, .contact_darken').fadeIn(200);
            contact_popup_orig_top = parseInt($('.contact_dialog').css('top'), 10);

            setContactPopupStyles(location, elem);
            $('.contact_dialog').fadeIn(200);
            $("#contact").submit(function(){
                doContact();
                return false;
            });
        });
    };

    function doContact() {
        var url = base_url + "contact";

        var extra_params = {onError : function(response){
            $("form#contact")[0].processErrors(response);
        }};
        ajaxRequest(url, $("form#contact").serializeFormJSON(), function() {
            $('#contact')[0].reset();
            $('#contact').hide();
            $('#contact_success').show();
            setTimeout(function(){ hideContact(); }, 6000);
        }, extra_params);
    };

    function hideContact() {
        $('.contact_lighten, .contact_darken').removeClass('footer');
        $('.contact_dialog').removeClass('header footer');
        $('.contact_dialog, .contact_lighten, .contact_darken').fadeOut(1000);
    };

    function setContactPopupStyles(location, elem) {
        var left = ($(window).width() - $('.contact_dialog').outerWidth())/2;
        $('.contact_dialog').css({"top":contact_popup_orig_top, "bottom":'auto', "left": left});
    }

});

if(is_frontpage) {
    $(window).load(function () {
        if ($(".preload").length) {
            $(".preload").addClass('active');
        }
    });
}

$(function () {
    var isMobile = fc.mobilecheck();

    $("#login_form").on("submit", function(e){
        e.preventDefault();
        var $th = $(this);
        var data = {};
        data.username = $('#login_username').val();
        data.password = $('#login_password').val();
        data.remember = $('#remember_me').is(':checked') ? 1 : 0;
        data.a_token = $('input[name="a_token"]').val();

        data.f_ajax_login = 1;
        var location = getURLParameter('location');
        if (location) {
            data.location = location;
        }

        var url = base_url + "login";

        $("#login_loader").show();

        var extra_params = {
            onError : function(response){
                if (response.status === "error") {
                    var errors = response.data;
                    if (empty(errors)) {
                       errors = {'global_error' : response.message};
                    }
                    $th[0].processErrors(errors);
                }
                $("#login_loader").hide();
        }};

        ajaxRequest(url, data, function(response){
            $("#login_loader").hide();
            window.location = response.data.redirect_to;
        }, extra_params);
    });


    $("#forgot_password").click(function(){
        var url = $(this).attr("href");
        url += "?email=" +  encodeURIComponent($("#login_username").val());
        window.location = url;
        return false;
    });

    $('#add_st').hover(
        function() {
            $('#storage_extra').fadeIn();
        }, function() {
            setTimeout( function() { $('#storage_extra').fadeOut(); }, 2000);
        }
    );

    $('.start_trial').click(function(e){
        e.preventDefault();
        var plan_id = $(this).data("plan-id");
        var url = base_url + "/marketplace/subscriptions/start_trial";
        ajaxRequest(url, {plan_id : plan_id}, function(){ }, { onError: function(response){
            $('#start_tr_err').html(response.message);
            $.magnificPopup.open({
                items: {
                    src: '#error_popup',
                    type: 'inline'
                }
            });        
            //alert(response.message);
        } });       
    });

    $('.popup__close-btn').click(function(){
        var magnificPopup = $.magnificPopup.instance;
        magnificPopup.close();
//        $(this).parents(".popup").hide();
    });

    $('.cancel-sub').click(function(){
        var plan_id = $(this).data('planid');
        var popup_height = $(".md-content").height();
        $(".md-content").css("margin-top", -popup_height/2);
        $("#subscriptions_popup").addClass(" md-show");
        $(".lighten").show();

        $("#subscriptions_popup").on('click', '#agree', function(){
            if($(this).hasClass('disabled')) {
                return;
            }
            $(this).addClass('disabled');

            fc.ajax(true);
            var url = base_url + "/marketplace/subscriptions/migrate_new_pricing";
            ajaxRequest(url, {plan_id : plan_id}, function(response){ window.location = response.data.dest_url; }, { onError: function(response){
                $('#subs_cncl_err').html(response.message).show();
                $('#subscriptions_popup').find('#agree, #notAgree, #pls_cancel_msg').remove();
                $('#subscriptions_popup').find('#close_cntr').show();
            } });
        });
        $("#subscriptions_popup").on('click', '#notAgree, #close', function(){
            $(".lighten").hide();
            $("#subscriptions_popup").removeClass(" md-show");
        });

    });
    $('.fc_for_people_link').click(function(e){
        e.preventDefault();
        var scrollTo = $("#for_the_people").parent().offset().top - $("#main-header").height();
        $('html, body').animate({
            scrollTop: scrollTo
        }, 800);
    });
    $('.fc_active_users_link').click(function(e){
        e.preventDefault();
        var scrollTo = $("#active_users").parent().offset().top - $("#main-header").height();
        $('html, body').animate({
            scrollTop: scrollTo
        }, 800);
    });
    $('.fc_entrp_link').click(function(e){
        e.preventDefault();
        var scrollTo = $("#enterprise_benefits").parent().offset().top - $("#main-header").height();
        $('html, body').animate({
            scrollTop: scrollTo
        }, 800);
    });
    $('.core_apps').click(function(e){
        e.preventDefault();
        var scrollTo = $("#core_apps").parent().offset().top - $("#main-header").height();
        $('html, body').animate({
            scrollTop: scrollTo
        }, 800);
    });
    
    $('.dropdown-hint .pricing-cell').on('click', function(e) {
        if($(this).hasClass('expanded')) {
            $(this).removeClass('expanded');
        } else {
            $('.pricing-cell.expanded').removeClass('expanded');
            $(this).addClass('expanded');
        }
    });

    $('.toggle').on('click', function(e) {
        $(this).toggleClass('is-active');
        $('.pricing-plans').find('.plan-monthly-value, .plan-yearly-value').toggleClass('hide');

        var is_annual = $(this).hasClass('is-active');
        $('.pricing-plans').find('.button-cta.checkout').each(function(){
            $(this).attr('href', $(this).data('href') + '/' + (is_annual ? 'annual' : 'monthly'));
        });
    });
});

fc.mobilecheck = function () {
    var check = false;
    (function(a,b){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}


/* REVEAL LIST VS KANBAN */

jQuery(document).ready(function($){
    //check if the .cd-image-container is in the viewport
    //if yes, animate it
    checkPosition($('.cd-image-container'));
    $(window).on('scroll', function(){
        checkPosition($('.cd-image-container'));
    });

    //make the .cd-handle element draggable and modify .cd-resize-img width according to its position
    $('.cd-image-container').each(function(){
        var actual = $(this);
        drags(actual.find('.cd-handle'), actual.find('.cd-resize-img'), actual, actual.find('.cd-image-label[data-type="original"]'), actual.find('.cd-image-label[data-type="modified"]'));
    });

    //upadate images label visibility
    $(window).on('resize', function(){
        $('.cd-image-container').each(function(){
            var actual = $(this);
            updateLabel(actual.find('.cd-image-label[data-type="modified"]'), actual.find('.cd-resize-img'), 'left');
            updateLabel(actual.find('.cd-image-label[data-type="original"]'), actual.find('.cd-resize-img'), 'right');
        });
    });
});

function checkPosition(container) {
    container.each(function(){
        var actualContainer = $(this);
        if( $(window).scrollTop() + $(window).height()*0.5 > actualContainer.offset().top) {
            actualContainer.addClass('is-visible');
        }
    });
}

//draggable funtionality - credits to http://css-tricks.com/snippets/jquery/draggable-without-jquery-ui/
function drags(dragElement, resizeElement, container, labelContainer, labelResizeElement) {
    dragElement.on("mousedown vmousedown", function(e) {
        dragElement.addClass('draggable');
        resizeElement.addClass('resizable');

        var dragWidth = dragElement.outerWidth(),
            xPosition = dragElement.offset().left + dragWidth - e.pageX,
            containerOffset = container.offset().left,
            containerWidth = container.outerWidth(),
            minLeft = containerOffset + 10,
            maxLeft = containerOffset + containerWidth - dragWidth - 10;

        dragElement.parents().on("mousemove vmousemove", function(e) {
            leftValue = e.pageX + xPosition - dragWidth;

            //constrain the draggable element to move inside his container
            if(leftValue < minLeft ) {
                leftValue = minLeft;
            } else if ( leftValue > maxLeft) {
                leftValue = maxLeft;
            }

            widthValue = (leftValue + dragWidth/2 - containerOffset)*100/containerWidth+'%';

            $('.draggable').css('left', widthValue).on("mouseup vmouseup", function() {
                $(this).removeClass('draggable');
                resizeElement.removeClass('resizable');
            });

            $('.resizable').css('width', widthValue);

            updateLabel(labelResizeElement, resizeElement, 'left');
            updateLabel(labelContainer, resizeElement, 'right');

        }).on("mouseup vmouseup", function(e){
            dragElement.removeClass('draggable');
            resizeElement.removeClass('resizable');
        });
        e.preventDefault();
    }).on("mouseup vmouseup", function(e) {
        dragElement.removeClass('draggable');
        resizeElement.removeClass('resizable');
    });
}

function updateLabel(label, resizeElement, position) {
    if(position == 'left') {
        ( label.offset().left + label.outerWidth() < resizeElement.offset().left + resizeElement.outerWidth() ) ? label.removeClass('is-hidden') : label.addClass('is-hidden') ;
    } else {
        ( label.offset().left > resizeElement.offset().left + resizeElement.outerWidth() ) ? label.removeClass('is-hidden') : label.addClass('is-hidden') ;
    }
}

// Check if mobile device to apply special JavaScript
if(navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
){
    // WE're IN MOBILE LAND
    fc.isMobileVersion = true;
    $("body").addClass("fc_mobile");

}
$(function(){
    function checkWindowWidth() {
        if( $(window).width() < 767 ) {
            fc.isMobileVersion = true;
            $("body").addClass("fc_mobile");
        } else {
            fc.isMobileVersion = false;
            $("body").removeClass("fc_mobile");
        }
    }

    $("#dismiss_update_lnk").click(function(){
        $(".updates_block").hide();
        fc.setCookie('f_dismiss_update', 1, 365);
        return false;
    });

    checkWindowWidth();
    $(window).resize(checkWindowWidth);
});
