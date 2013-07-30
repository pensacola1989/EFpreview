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

		this.init = function () {
			common.render(data);
		};

		init();
	})(data);
};