// var Preview = Preview || {};
Preview.multipleChoice =  Preview.multipleChoice || {};

$(document).ready(function(){
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

		function renderStimulus () {
			var $stiRoot = $('.choice_sti');
			var imgTemplate = '<div class="sti_img"><img src="{src}"/></div>';
			var type = data.Content.StimulusItemType.toLowerCase();

			if(type == 'image') {
				var content = imgTemplate.replace('{src}',data.Content.Stimulus);
				$stiRoot.html(content);
			} else if(type == 'text') {

			}
		}

		function renderReponse () {
			var $resRoot = $('.choice_res')
			 , C_CHOCICE_ITEM = '.res_item'
			 , SELECT_CLASS = 'select'
			 , UNSELECT_CLASS = 'unselect'
			 , index = Preview.index
			 , RES_TEMPLATE = '<div class="res_item unselect {select}">{content}</div>'
			 , responses = data.Content.Questions[index].Responses;
			 
			$resRoot.hide();
			var content = '';
			$.each(responses,function (i,res) {
				var cls = res.IsSelected == 'true' ? SELECT_CLASS : UNSELECT_CLASS;
				content += RES_TEMPLATE.replace('{select}',cls).replace('{content}',res.ItemContent);
			});
			$resRoot.html(content).fadeIn();
		}

		this.init = function () {
			common.render(data,renderReponse);
			renderStimulus();
			renderReponse();
		};

		init();
	})(data);
};