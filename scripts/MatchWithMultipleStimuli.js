Preview.MatchWithMultipleStimuli = Preview.MatchWithMultipleStimuli || {};

$(document).ready(function () {
	Preview.Common.loadData('../data/1.MatchWithMultipleStimuliWithAnswers.json',Preview.MatchWithMultipleStimuli);
});

Preview.MatchWithMultipleStimuli = function (data) {

	var _common = Preview.Common
	 ,	$root = $('.answer_area')
	 ,	STIMULUS_INSIDE_C = '.stimulus_inside'
	 ,	DROPZONE_C = '.dropzone'
	 ,	stiImg_TPL = '<div class="stimulus_item img_item"><img src="{data}"/></div>'
	 ,	drpTxt_TPL = '<div class="dropzone_item txt_item"><div class="dropzone_textarea">{data}</div><div class="answer"><img src="{src}"/></div></div>'
	 ,	drpImg_TPL = '<div class="dropzone_item img_item"><img src="{data}"/><div class="img_answer"><img src="{src}"/></div></div>'
	 ,	drpAudio_TPL = '<div class="dropzone_item audio_item"><img class="m_play_btn" url="{data}" src="../images/stiPlay_btn.png"/><div class="audio_answer"><img src="{src}"/></div></div>'
	 ,	stitext_TPL = '<div class="stimulus_item txt_item"><div class="sti_textarea">{data}</div></div>'
	 ,	jPlayer = '<div id="jquery_jplayer_1" class="jp-jplayer"></div>'
	 ,	stiAudio_TPL = '<div class="stimulus_item audio_item"><img class="m_play_btn" url="{data}" src="../images/stiPlay_btn.png"/></div>';

	return (function () {
		

		function renderStiInside () {
			var question = data.Content.Questions[0];
			var drpSti = question.DropzoneStimuli || question.Stimuli;
			var type = (question.DropzoneStimulusItemType || question.StimulusItemType).toLowerCase();

			var getTPL = function (type) {
				var ret = {};
				ret['text'] = stitext_TPL;
				ret['image'] = stiImg_TPL;
				ret['audio'] = stiAudio_TPL;
				return ret[type] || '';
			};

			var content = '';
			$.each(drpSti,function (index,drp) {
				content += getTPL(type).replace('{data}',drp.ItemContent);
			});
			$root.find(STIMULUS_INSIDE_C).html(content);
		}

		/*
		* Bind events if has
		*/
		function bindEvent () {

			$('#drpAudio').jPlayer({
				swfPath: "http://jplayer.org/latest/js",
		        supplied: "mp3, oga",
		        cssSelectorAncestor: '#drpAudio'
			});

			$('.m_play_btn')
				.unbind()
				.bind('click',function (e) {
					var url = $(this).attr('url');
					if($(this).attr('playing') == 'true') {
						$(this).attr('playing','false');
						$(this).attr('src','../images/stiPlay_btn.png');
						$('#drpAudio').jPlayer('stop');
					} else {
						//$(this).parents('.audio_item').siblings().find('img').attr('src','../images/stiPlay_btn.png').attr('playing','false');
						$root.find('.audio_item').find('img').attr('src','../images/stiPlay_btn.png').attr('playing','false');
						$(this).attr('src', '../images/stiAudio_stop.png');
						$(this).attr('playing','true');
						$('#drpAudio').jPlayer("setMedia", {
				            mp3: url
			            }).jPlayer('play');
					}
				});
		}

		function renderDropzone () {
			var question = data.Content.Questions[0];
			var drpStimulus = question.DropzoneStimuli || question.Stimuli;
			var responses = question.Responses;
			var type = question.ResponseItemType.toLowerCase();

			var getTPL = function (type) {
				var ret = {};
				ret['text'] = drpTxt_TPL;
				ret['image'] = drpImg_TPL;
				ret['audio'] = drpAudio_TPL;
				return ret[type] || '';
			};

			var content = '';
			$.each(responses,function (index,rsp) {
				var targetSti = drpStimulus[index];
				var src = targetSti.ResponseId == targetSti.AnswerId ? '../images/ok_btn.png' : '../images/close_btn.png';
				content += getTPL(type).replace('{data}',rsp.ItemContent).replace('{src}',src);
			});
			$root.find(DROPZONE_C).html(content);
		}

		function init () {
			_common.render(data,null);
		//	_common.renderLeftSti(data);
			renderStiInside();
			renderDropzone();
			bindEvent();
		}

		init();

	})(data);
};