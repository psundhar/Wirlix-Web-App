
var quotes = [
	"“Wisdom is not a product of schooling but of the lifelong attempt to acquire it.”  <br><br>— Albert Einstein",
	"“Live as if you were to die tomorrow. Learn as if you were to live forever.” <br><br>—  Mahatma Gandhi",
	"“Not for ourselves alone are we born.” <br><br>— Marcus Tullius Cicero",
	"“Coming together is a beginning; keeping together is progress; working together is success.”<br><br>— Henry Ford",

	"“The best way to not feel hopeless is to get up and do something. Don’t wait for good things to happen to you. If you go out and make some good things happen, you will fill the world with hope, you will fill yourself with hope.”<br><br>—  Jacob Bronowski"
];

var index = 0;
var max = quotes.length - 1;
var delay = .02;

function random(min, max){
	return (Math.random() * (max - min)) + min;
}

function cycleQuotes(arr, i, sel){
	var el = $(sel);
	var message = arr[i];
	el.html(message);
	var split = new SplitText(el);
	var time = split.chars.length * delay;

	$(split.chars).each(function(i){
		TweenMax.from($(this), time, {
			opacity: 0,
			x: 0,
			y: random(-200, 200),
			z: random(500, 1000),
			// scale: .1,
			delay: i * delay,
			yoyo: true,
			repeat: -1,
			repeatDelay: time * 4,
			ease: Power1.easeOut
		});
	});

	index = index == max ?  0 : (index + 1);

	setTimeout(function(){

		cycleQuotes(quotes, index, ".split");
	}, ((time * 4) + (time * 4)) * 1000);

}

$(window).load(function(){
	cycleQuotes(quotes, index, ".split");
});
