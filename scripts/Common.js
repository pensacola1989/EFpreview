var Preview = Preview || {};

Preview.Common = Preview.Common || {};
Preview.index = 0;
Preview.template = {};
Preview.Common.loadData = function (url,cb) {
	$.ajax({
		url: url,
		type: 'GET'
	}).success(function (data) {
		if(cb && typeof cb == 'function')		
			cb(data);
	}).error(function (err) {
		console.log(err);
	});	
};

Preview.Common.jpAudio = function (audioUrl) {
	var $container
	 ,	$template
	 ,	$jPlayer;

	function setUI() {
		$jPlayer = $('#jquery_jplayer_1');
		$container = $('.choice_sti');
		$template = $('.template').find('#jp_container_1').clone();
		$('.template').empty();
		$container.html($template);		
	}

	function bindEvent () {
		$jPlayer.jPlayer({
				 ready: function(event) {
		            $(this).jPlayer("setMedia", {
		            	mp3: audioUrl
		                // mp3: "http://jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3"
		            });
		        },
		        swfPath: "http://jplayer.org/latest/js",
		        supplied: "mp3, oga"
			});
	}

	function init() {
		if(!audioUrl){
			console.log('parameter needed!');
			return;
		}
		setUI();
		bindEvent();
	}

	init();
	
};

Preview.Common.makeProgress = function (len,cb) {
	var $footer = $('.common_footer')
		 ,	C_PROGRESS = '.bar_ul'
		 ,	_progressTemplate = '<li class="bar_li"></li>'
		 ,	C_PREVIEW_BTN = '.footer_left'
		 ,	C_FOOTER_BTN = '.footer_btn'
		 ,	C_NEXT_BTN = '.footer_right';

	function renderProgressBar () {
		var result = '';

		if(len) {
			for(var i = 0; i < len; i++) {
				result += _progressTemplate;
			}
			$footer.find(C_PROGRESS).html(result);
			$footer.find(C_PROGRESS)
					.find('li')
					.eq(Preview.index)
					.addClass('active_bar');
		}
	};

	function setBtnStyle () {
		$footer.find(C_FOOTER_BTN).removeClass('disabled');
		if(Preview.index - 1 < 0) {
			$footer.find(C_PREVIEW_BTN).addClass('disabled');
		}
		if(Preview.index + 1 >= len) {
			$footer.find(C_NEXT_BTN).addClass('disabled');
		}
	}

	function bindStepEvent () {

		$footer.find(C_FOOTER_BTN).bind('click',function () {
			var isLeft = $(this).hasClass(C_PREVIEW_BTN.replace('.',''));
			
			if((isLeft && Preview.index -1 >= 0) || (Preview.index + 1 < len && !isLeft)) {
				if(isLeft) {
					moveBar(--Preview.index);		
				} else {
					moveBar(++Preview.index);
				}
			} else {
				$(this).addClass('disabled');
				return false;
			}
			if(cb && typeof cb == 'function'){
				cb();
			}
		});

		$footer.find(C_PROGRESS).find('li').bind('click',function () {
			var idx = $(this).index();
			Preview.index = idx;
			moveBar(idx);
			if(cb && typeof cb == 'function') {
				cb();
			}
		});
	}

	/*
	* move to index
	*/
	function moveBar (index) {
		var $li = $footer.find(C_PROGRESS).find('li');
		$li.each(function (index,li) {
			$(li).removeClass('active_bar');
		});
		$li.eq(index).addClass('active_bar');
		setBtnStyle();
	}

	function init () {
		renderProgressBar();
		setBtnStyle();
		bindStepEvent();
	};

	init();

}

Preview.Common.render = function (data,callback) {
	var $header = $('.common_header')
		 ,	C_HEADER_INS = '.header_ins'
		 ,	C_HEADER_STEP = '.header_step';



	var renderHeader = function () {
		var content = data.Common.Instruction;
		$header.find(C_HEADER_INS).html(content);
	};

	

	var init = function () {
		var qs = data.Content.Questions || data.Content.Question;
		var len = qs.len;
		renderHeader();	
		if(len >= 2 && (callback && typeof callback == 'function')){
			Preview.Common.makeProgress(len,callback);			
		}

	//	renderProgressBar();
	};

	init();
}