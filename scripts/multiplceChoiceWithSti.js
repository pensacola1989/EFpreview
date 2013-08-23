Preview.multipleChoice =  Preview.multipleChoice || {};

$(document).ready(function(){
	Preview.Common.loadData('../data/3.MultipleChoiceWithStimulusWithAnswers.json',Preview.multipleChoice);

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
	// $.ajax({
	// 	url:'../data/3.MultipleChoiceWithStimulusWithAnswers.json',
	// 	type: 'GET'
	// }).success(function (data) {
	// 	Preview.multipleChoice(data);		
	// }).error(function (err) {
	// 	console.log(err);
	// });
	//--------------------------------------------------
});

Preview.multipleChoice = function (data) {
	var common = Preview.Common;

	return (function () {

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
											.replace('{src}',Preview.Common.getAbsUrl(res.ItemContent));
				}

			});
			$resRoot.html(content).show();


			var $header = $('.common_header')
			 ,	C_HEADER_STEP = '.header_step'
			 , questions = data.Content.Questions
			 , retContent = questions.length > 1 ? questions[index].Title : questions[0].Title;

			$header.find(C_HEADER_STEP).html(retContent);
		}

		this.init = function () {
			common.render(data,renderReponse);
			common.renderLeftSti(data);
		//	renderStimulus();
			renderReponse();
		};

		init();
	})(data);
};