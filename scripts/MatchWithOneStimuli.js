Preview.matchWithOneStimuli = Preview.matchWithOneStimuli || {};

$(document).ready(function () {
	Preview.Common.loadData('../data/2.MatchWithOneStimuliWithAnswers.json',Preview.matchWithOneStimuli);
});

Preview.matchWithOneStimuli = function (data) {

	var _common = Preview.Common
	 ,	$root = $('.answer_area')
	 ,	STIMULUS_INSIDE_C = '.stimulus_inside'
	 ,	DROPZONE_C = '.dropzone'
	 ,	stiImg_TPL = '<div class="stimulus_item img_item"><img src="{data}"/></div>'
	 ,	drpTxt_TPL = '<div class="dropzone_item txt_item"><div class="dropzone_textarea">{data}</div></div>'
	 ,	stitext_TPL = '<div class="stimulus_item txt_item"><div class="sti_textarea">{data}</div></div>';

	return (function () {
		

		function renderStiInside () {
			var question = data.Content.Question[0];
			var drpSti = question.DropzoneStimuli;
			var type = question.DropzoneStimulusItemType.toLowerCase();

			var getTPL = function (type) {
				var ret = {};
				ret['text'] = stitext_TPL;
				ret['image'] = stiImg_TPL;
				ret['audio'] = '';
				return ret[type] || '';
			};

			var content = '';
			$.each(drpSti,function (index,drp) {
				content += getTPL(type).replace('{data}',drp.ItemContent);
			});
			$root.find(STIMULUS_INSIDE_C).html(content);
		}

		function renderDropzone () {
			var question = data.Content.Question[0];
			var responses = question.Responses;
			var type = question.ResponseItemType.toLowerCase();

			switch (type) {
				case 'image':

					break;
				case 'text':
						var content = '';
						$.each(responses,function (index,res) {
							content += drpTxt_TPL.replace('{data}',res.ItemContent);
						});
						$root.find(DROPZONE_C).html(content);
					break; 	
				case 'audio':
				
					break;	
				default:
					break;
			}
		}

		function init () {
			_common.render(data,null);
			renderStiInside();
			renderDropzone();
		}

		init();

	})(data);
};