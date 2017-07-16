$(document).ready(function(){

  $(".vote-box i").click(function(){
    $(this).toggleClass("checked");
  });

  $(window).resize(function(){
    if($(window).width() <= 768){
      $(".help").html("Tutorial");
      $(".navbar.navbar-default .nav .logout").html("Logout");
    } else {
      $(".help").html("? <br><span>See Tutorial</span>");
      $(".navbar.navbar-default .nav .logout").html("<img src='/images/logout.png'>");
    }
  });

  if($(window).width() <= 768){
    $(".help").html("Tutorial");
    $(".navbar.navbar-default .nav .logout").html("Logout");
  } else {
    $(".help").html("? <br><span>See Tutorial</span>");
  }


  // $(".button-vote.up").click(function(){
  //
  //   $(this).closest(".comment").find(".button-vote.down").removeClass("clicked");
  //   if($(this).hasClass("clicked")){
  //     var num = parseInt($(this).find(".vote-num").html());
  //     $(this).removeClass("clicked");
  //     // num = num - 1;
  //     // $(this).find(".vote-num").html(num);
  //   } else {
  //     var num = parseInt($(this).find(".vote-num").html());
  //     $(this).addClass("clicked");
  //     // num++;
  //     // $(this).find(".vote-num").html(num);
  //   }
  // });
  // $(".button-vote.down").click(function(){
  //
  //   $(this).closest(".comment").find(".button-vote.up").removeClass("clicked");
  //   if($(this).hasClass("clicked")){
  //     var num = parseInt($(this).find(".vote-num").html());
  //     $(this).removeClass("clicked");
  //     // num++;
  //     // $(this).find(".vote-num").html(num);
  //   } else {
  //     var num = parseInt($(this).find(".vote-num").html());
  //     $(this).addClass("clicked");
  //     // num = num - 1;
  //     // $(this).find(".vote-num").html(num);
  //   }
  // });


  $(".res-button.dis button").click(function(){
    $(".comment p").removeClass("agree");
    $(".comment p").toggleClass("disagree");
  });
  $(".res-button.agr button").click(function(){
    $(".comment p").toggleClass("agree");
    $(".comment p").removeClass("disagree");
  });

  $(".end-debate").click(function(){
    $(".end-confirm").fadeIn();
    $(".end-overlay").fadeIn();
  });

  $(".end-confirm .cancel").click(function(){
    $(".end-confirm").fadeOut();
    $(".end-overlay").fadeOut();
  });

  $(".end-confirm .confirm").click(function(){
    $(".end-confirm").fadeOut();
    $(".end-overlay").addClass("ended");
    $(".end-message").fadeIn();
  });

  $(".close-bottom").click(function(){
    $(".end-message").fadeOut();
    $(".end-confirm").fadeOut();
    $(".end-overlay").fadeOut();
    $(".end-overlay").removeClass("ended");
  });


  //Adding questions for demo purposes
  var q1 = $(".question.one").html();
  var q2 = $(".question.two").html();
  var q3 = $(".question.three").html();

  $(".question-box").click(function(){
    $(".chat-box").animate({ scrollTop: $('.chat-box').prop("scrollHeight")}, 300);
    if($(this).hasClass("one") == true){
      $(this).closest("#convo").find(".chat-box").append(q1);
    } else if($(this).hasClass("two") == true){
      $(this).closest("#convo").find(".chat-box").append(q2);
    } else {
      $(this).closest("#convo").find(".chat-box").append(q3);
    }
  });

  var vid = $("#bgvid");
  var c = 0;
  var d = 0;
  $(".mute").find("img").on("click", function(){
    c++;
    if ((c % 2) === 0){
      $(this).attr("src", "/images/sound.png");
      vid.prop('muted', true);
    } else {
      $(this).attr("src", "/images/mute.png");
      vid.prop('muted', false);
    }
  });
  $(".control").find("img").on("click", function(){
    d++;
    if ((d % 2) === 0){
      $(this).attr("src", "/images/pause.png");
      $("#bgvid")[0].play();
    } else {
      $(this).attr("src", "/images/play.png");
      $("#bgvid")[0].pause();
    }
  });

  if ($(window).width() <= 768){
    vid.prop('muted', false);
    $(".emotional").addClass("tab-pane");
    $(".factual").addClass("tab-pane");
    $(".middle").addClass("tab-pane");
    vid.removeAttr('autoplay');
    vid.attr('controls','');

  }

  $(window).resize(function(){
    if ($(window).width() <= 768){
      vid.prop('muted', false);
      $(".emotional").addClass("tab-pane");
      $(".factual").addClass("tab-pane");
      $(".middle").addClass("tab-pane");
      vid.attr('controls','');

    } else {
      $(".emotional").removeClass("tab-pane");
      $(".factual").removeClass("tab-pane");
      $(".middle").removeClass("tab-pane");
      vid.removeAttr('controls');


    }
  });


  $(document).ready(function(){
    if($(window).width() <= 768){
      $(".nav li a.profile").html("Your Profile");
    } else {
      $(".nav li a.profile").html('<img src="/images/profile.png">');
    }
    $(window).resize(function(){
      if($(window).width() <= 768){
        $(".nav li a.profile").html("Your Profile");
      } else {
        $(".nav li a.profile").html('<img src="/images/profile.png">');
      }
    });
  });
  animatePath('#LF path', 'stroke-dashoffset 1s ease-in-out');
  function animatePath(pathname, animation) {
var path = document.querySelector(pathname);
var length = path.getTotalLength();
// Clear any previous transition
path.style.transition = path.style.WebkitTransition =
  'none';
// Set up the starting positions
path.style.strokeDasharray = length + ' ' + length;
path.style.strokeDashoffset = length;
// Trigger a layout so styles are calculated & the browser
// picks up the starting position before animating
path.getBoundingClientRect();
// Define our transition
path.style.transition = path.style.WebkitTransition =
  animation;
// Go!
path.style.strokeDashoffset = '0';
}



});


  var debates = $('.my-debates'),
      animateTime = 200,
      button = $('.my-debates-button a');
  button.click(function(event){
    event.preventDefault();
    if(debates.height() === 0){
      autoHeightAnimate(debates, animateTime);
    } else {
      debates.stop().animate({ height: '0' }, animateTime);
    }
  });



/* Function to animate height: auto */
function autoHeightAnimate(element, time){
  	var curHeight = element.height(), // Get Default Height
        autoHeight = element.css('height', 'auto').height(); // Get Auto Height
    	  element.height(curHeight); // Reset to Default Height
    	  element.stop().animate({ height: autoHeight }, time); // Animate to Auto Height
}

$(function animate() { //Scrolls to element
      $('.button-home a').on('click',function(event){
          $('html, body').stop().animate({
              scrollTop: $(".news-section").offset().top
          }, 700,'easeInOutExpo');
          event.preventDefault();
      });
  });


  $(".comment p i").each(function(){
    $(this).click(function(){
      $(this).toggleClass("selected");
    });
  });

  $(".profile-content .challenge i").each(function(){
    $(this).click(function(){
      $(this).toggleClass("selected");
    });
  });

  $(".qotd button").each(function(){
    $(this).click(function(){
      $(this).toggleClass("selected");
    });
  });

// document.addEventListener('DOMContentLoaded', function(){
//   Typed.new('.typewriter', {
//     strings: ["Launching this Fall.", "Stay tuned for our app"],
//     typeSpeed: 100,
//     loop: true
//   });
//
// });

// $(".debate").flip({
//   trigger: 'manual'
// }); // flip plugin

$(".qotd").flip();



$(".notif").click(function(e){
    e.stopPropagation();
});

// $(".debate").click(function(e){
//   $(this).flip('toggle');
// });

$(".button-vote").click(function(e){
  // e.stopPropagation();
});

$(".next-buttons button.next").click(function(){
  if ($(this).closest(".rank-content").next().length){
    $(this).closest(".rank-content").hide();
    $(this).closest(".rank-content").next().show();
  }
});

$(".next-buttons button.back").click(function(){
  if ($(this).closest(".rank-content").prev().length){
    $(this).closest(".rank-content").hide();
    $(this).closest(".rank-content").prev().show();
  }
});


$(".next-buttons button.next").click(function(){
  if ($(this).closest(".profile-content").next().length){
    $(this).closest(".profile-content").hide();
    $(this).closest(".profile-content").next().show();
  }
});

$(".next-buttons button.back").click(function(){
  if ($(this).closest(".profile-content").prev().length){
    $(this).closest(".profile-content").hide();
    $(this).closest(".profile-content").prev().show();
  }
});
