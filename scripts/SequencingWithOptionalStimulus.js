Preview.SequencingWithOptionalStimulus = Preview.SequencingWithOptionalStimulus || {};

$(document).ready(function () {
	Preview.Common.loadData('../data/5.SequencingWithOptionalStimulusWithAnswers.json',Preview.SequencingWithOptionalStimulus);
});

Preview.SequencingWithOptionalStimulus = function (data) {
	
	var _common = Preview.Common;
	var _responses = data.Content.Questions[0].Responses;
	var $root = $('.seq_area');
	var ITEM_TPL = '<div class="seq_item"><p>{data}</p><div class="seq_ans"><img src="{src}"/></div></div>';

	return (function () {

		function renderRsp () {
			var content = '';

			if(_responses.length) {
				$.each(_responses,function (index,rsp) {
					var src = rsp.IsDistractor == 'false' && rsp.Order == rsp.ResponseOrder 
									? '../images/ok_btn.png' : '../images/close_btn.png';

					content += ITEM_TPL.replace('{data}',unescape(rsp.ItemContent)).replace('{src}',src);
				});
				$root.html(content);
			}	
		}

		function init () {
			renderRsp();
			_common.render(data,function(){});
			_common.renderLeftSti(data);
		}

		init();

	})(data);
}