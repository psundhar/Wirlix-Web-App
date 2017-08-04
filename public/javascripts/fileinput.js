var inputs = document.querySelectorAll( '.inputfile' );
Array.prototype.forEach.call( inputs, function( input )
{
	var label	 = input.nextElementSibling,
		labelVal = label.innerHTML;

	input.addEventListener( 'change', function( e )
	{
		readURL(this);
		var fileName = '';
		if( this.files && this.files.length > 1 )
			fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
		else
			fileName = e.target.value.split( '\\' ).pop();

		// if( fileName )
		// 	label.querySelector( '#filename' ).innerHTML = fileName;
		// else
		// 	label.innerHTML = labelVal;
		$(".upload-group").fadeOut();
	});
});

function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#profile-img').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }


}

$("#profile-img").on("load",function(){
	reposition();
	$(".change").fadeIn();
	$(".img-container").css({
		"margin-bottom" : 0
	});
});



$('.continue').on('click',function(e){
	var file = $("#file").val();
	if (file == ""){
		$('.modal-continue').fadeIn();
		$('.overlay').fadeIn();
		e.preventDefault();
	}
});

function closeModal(){
	$('.modal-continue').fadeOut();
	$('.overlay').fadeOut();
	e.preventDefault();
}


function reposition() {
	var img = $('.img-container img');
	var y1 = $('.img-container').height();
    	var x1 = $('.img-container').width();
    	var desktop_start_x=0;
    	var desktop_start_y=0;
    	var mobile_start_x= -200;
    	var mobile_start_y= -200;

	    		$('.continue a').hover(function(event){
			            var t = img.position().top,
	 			l = img.position().left;
			           img.attr('data-top', t);
			            img.attr('data-left', l);
				});

						var y2 = img.height();
						var x2 = img.width();

	    			  img.draggable({
	    			  	disabled: false,
	    			  	scroll: false,
	    			  	axis: 'y, x',
	    			  	cursor : 'move',
	    			  	 drag: function(event, ui) {
							 if(ui.position.top >= 0)
							  {
								  ui.position.top = 0;
							  }
							  if(ui.position.top <= y1 - y2)
							  {
								  ui.position.top = y1 - y2;
							  }
							  if (ui.position.left >= 0) {
									ui.position.left = 0;
							  }
							  if(ui.position.left <= x1 - x2)
							  {
								  ui.position.left = x1 - x2;
							  }
	    			 	}
	    	});

    	};
