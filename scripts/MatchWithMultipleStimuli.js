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
	 ,	stiAudio_TPL = '<div class="stimulus_item audio_item"><img class="m_play_btn" url="{data}" src="../images/stiPlay_btn.png"/></div>'
	 ,	disTxt_TPL = '<div class="dropzone_item txt_item"><div class="dropzone_textarea">{data}</div></div>'
	 ,	disImg_TPL = '<div class="dropzone_item img_item"><img src="{data}"/></div>'
	 ,	disAudio_TPL = '<div class="dropzone_item audio_item"><img class="m_play_btn" url="{data}" src="../images/stiPlay_btn.png"/></div>';

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
				var data = (type == 'image' || type == 'audio') 
					? _common.getAbsUrl(drp.ItemContent) 
					: drp.ItemContent;
				content += getTPL(type).replace('{data}',data);
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

		/*
		*	@sti--> stiArray
		*	@res--> resArray
		* 	@return --> disArray
		*/
		function getDis(src,tgt) {
			var srcIdArr = [], dis = [];
			for(var s in src) {
			   srcIdArr.push(src[s].ResponseId); 
			}

			for(var t in tgt) {
			    if($.inArray(tgt[t].Id,srcIdArr) === -1) {
			      dis.push(tgt[t]);
			    }
			}
			return dis;
		}

		function renderDis () {
			var sti = data.Content.Questions[0].Stimuli;
			var res = data.Content.Questions[0].Responses;
			var disArr = getDis(sti,res);
			var type = data.Content.Questions[0].ResponseItemType.toLowerCase();
			var getTPL = function (type) {
				var ret = {};
				ret['text'] = disTxt_TPL;
				ret['image'] = disImg_TPL;
				ret['audio'] = disAudio_TPL;
				return ret[type] || '';
			};


			if(disArr.length) {
				var content = '';
				$.each(disArr,function (index,dis) {
					var data = (type == 'image' || type == 'audio') 
					? _common.getAbsUrl(dis.ItemContent) 
					: dis.ItemContent;
					content += getTPL(type).replace('{data}',data);

				});
				$('.distracotr_zone').html(content);
			}
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

			$.each(drpStimulus,function (index,drp) {
				var targetRes = responses[index];
				var src = drp.ResponseId == drp.AnswerId ? '../images/ok_btn.png' : '../images/close_btn.png';
				var data = (type == 'image' || type == 'audio') 
					? _common.getAbsUrl(responses[index].ItemContent) 
					: responses[index].ItemContent;
				content += getTPL(type).replace('{data}',data).replace('{src}',src);
			});
			$root.find(DROPZONE_C).html(content);
		}

		function init () {
			_common.render(data,null);
		//	_common.renderLeftSti(data);
			renderDis();
			renderStiInside();
			renderDropzone();
			bindEvent();
		}

		init();

	})(data);
};