Preview.GapFillWithOptionalStimulus = Preview.GapFillWithOptionalStimulus || {};

$(document).ready(function () {
	Preview.Common.loadData('../data/4.GapFillWithOptionalStimulusWithAnswers.json',Preview.GapFillWithOptionalStimulus);
});

Preview.GapFillWithOptionalStimulus = function (data) {
	var _common = Preview.Common
	 ,	_content = data.Content
	 ,	$root = $('.article')
	 ,	PARA_C = '.para'
	 ,	GAP_C = '.gap';

	return (function () {

		function getFill (type) {
			var content = type == 'user' 
						? _content.Questions[Preview.index].Response.AnswerContent 
						: _content.Questions[Preview.index].Response.ItemContent;

			var ret = $('<div>' + content + '</div>').find('gap');
			var arr = [];

			$.each(ret,function (index,r) {
				var html = $(r).html();
				arr.push(html);
			});
			return arr;
		}

		function renderArticle () {
			var qs = _content.Questions[Preview.index].Response;

			var ic = qs.ItemContent.split('<br/> <br/>')
			 ,	exceptGap = []
			 ,	ret = ''
			 ,	userFill = getFill('user')
			 ,	rightFill = getFill();

			var $dom = $('<div>' + qs.ItemContent + '</div>');
			var $gaps = $dom.find('gap');
			$gaps.each(function (index,g) {
				$(this).after('<input class="gaps" readonly="true" value="sdsfds" type="text"/>');
				$(this).remove();
			});
			$root.html($dom.html());

			var falseArr = [];

			$.each(userFill,function (index,fill) {
				if(fill != rightFill[index]) {
					falseArr.push(index);
				}

				$('.gaps')
					.eq(index)
					.val(fill)
					.css('width',fill.length * 7);
			});
			console.log(falseArr);

			$('.gaps').each(function (index,g) {
				var css = {
					// 'border': '1px solid',
					'position': 'absolute',
					'left': $(g).offset().left,
					'top': $(g).offset().top,
					'height': '30px',
					'width': '30px'
				}
				
				var imgSrc = $.inArray(index,falseArr) != -1 ? '../images/close_btn.png' : '../images/ok_btn.png';
				$('<div></div>').addClass('float_anwer').html('<img src="' + imgSrc + '"/>').css(css).appendTo('body');
			});
			// check the answer right or not.
		}

		function checkAnswer () {
			
		}

		function init () {
			_common.render(data,renderArticle);
			_common.renderLeftSti(data);
			renderArticle();
		}

		init();

	})(data);
}