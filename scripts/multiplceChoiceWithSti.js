// var Preview = Preview || {};
Preview.multipleChoice =  Preview.multipleChoice || {};

$(document).ready(function(){

	//--------------------testing-----------------------
    // $("#jquery_jplayer_1").jPlayer({
    //     ready: function(event) {
    //         $(this).jPlayer("setMedia", {
    //             mp3: "http://jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3",
    //             oga: "http://jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg"
    //         });
    //     },
    //     swfPath: "http://jplayer.org/latest/js",
    //     supplied: "mp3, oga"
    // });

	//--------------------------------------------------

	$.ajax({
		url:'../data/3.MultipleChoiceWithStimulusWithAnswers.json',
		type: 'GET'
	}).success(function (data) {
		Preview.multipleChoice(data);		
	}).error(function (err) {
		console.log(err);
	});
});

Preview.multipleChoice = function (data) {
	var common = Preview.Common;

	return (function () {

		/*
		* if sti for all，do not render stimulus per time.
		* else render per time
		*/
		function renderStimulus () {
			var isForAll = false
			, $stiRoot = $('.choice_sti')
			, imgTemplate = '<div class="sti_img"><img src="{src}"/></div>'
			, txtTemplate = '<div class="sti_text"><textarea readonly="true">{text}</textarea></div>'
			, type = data.Content.StimulusItemType.toLowerCase()
			, stimulusArr = []
			, questions = data.Content.Questions
			, isForAll = data.Content.Stimulus != '' ? true : false;
			
			for(var i = 0; i < questions.length; i++) {
				var ret = isForAll 
						? data.Content.Stimulus
						: questions[i].Stimulus;

				stimulusArr.push(ret);
			}

			if(type == 'image') {
				var content = imgTemplate.replace('{src}',stimulusArr[Preview.index]);
				$stiRoot.html(content);	
			} else if(type == 'text') {
				var content = txtTemplate.replace('{text}','fdsfdsfsfsdfsdfsdfsdf');
				$stiRoot.html(content);
			} else if(type == 'audio') {
				Preview.Common.jpAudio(stimulusArr[Preview.index]);
			}
			// $.each(stimulusArr,function (index,sti) {
			// 	if(type == 'image') {
			// 		var content = imgTemplate.replace('{src}',sti);
			// 		$stiRoot.html(content);
			// 	} else if(type == 'text') {
			// 		var content = txtTemplate.replace('{text}','fdsfdsfsfsdfsdfsdfsdf');
			// 		$stiRoot.html(content);
			// 	} else if(type == 'audio') {
			// 		Preview.Common.jpAudio('ss');
			// 	}
			// });
		}

		function renderReponse () {
			var $resRoot = $('.choice_res')
			 , C_CHOCICE_ITEM = '.res_item'
			 , SELECT_CLASS = 'select'
			 , UNSELECT_CLASS = 'unselect'
			 , index = Preview.index
			 , IMGTEMPLATE = '<div class="img_item {select}"><img style="left:50px;top:50px;height:50px;width:50px;position:absolute;display:{show}" src="../images/{tagsrc}"><img src="{src}"/></div>'
			 , RES_TEMPLATE = '<div class="res_item unselect {select}"><p>{content}</p><img class="txt_ans" style="display:{show}" src="../images/{src}"/></div>'
			 , responses = data.Content.Questions[index].Responses
			 , responseType = data.Content.Questions[index].ResponseItemType.toLowerCase();
			 
			$resRoot.hide();
			var content = '';

			$.each(responses,function (i,res) {
				var cls = res.IsSelected == 'true' ? SELECT_CLASS : UNSELECT_CLASS;
				var show = res.IsSelected == 'true' ? 'block' : 'none';
				var src = res.IsSelected == 'true' && res.IsAnswer == 'true' 
						? 'ok_btn.png'
						: 'close_btn.png';
				if(responseType == 'text') {
					content += RES_TEMPLATE.replace('{select}',cls)
											.replace('{content}',res.ItemContent)
											.replace('{show}',show)
											.replace('{src}',src);					
				} else if(responseType == 'image') {
					content += IMGTEMPLATE.replace('{select}',cls)
											.replace('{tagsrc}',src)
											.replace('{show}',show)
											.replace('{src}',res.ItemContent);
				}

			});
			$resRoot.html(content).show();
		}

		this.init = function () {
			common.render(data,renderReponse);
			renderStimulus();
			renderReponse();
		};

		init();
	})(data);
};