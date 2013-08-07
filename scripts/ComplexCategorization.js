Preview.ComplexCategorization = Preview.ComplexCategorization || {};

$(document).ready(function () {
	Preview.Common.loadData('../data/ComplexCategorizationWithAnswers.json',Preview.ComplexCategorization);
});

Preview.ComplexCategorization = function (data) {
	var _common = Preview.Common
	 ,	$root = $('.table').find('tbody')
	 ,	_columTitle_tpl = '<td class="tableTitle">{data}</td>'
	 ,	_content_tpl = '<td class="tableContent"><div class="content_area">{data}</div><div class="tbl_answer"></div></td>'
	 ,	_responses = data.Content.Questions[0].Responses
	 ,	_responseFills = data.Content.Questions[0].ResponseFill;

	return (function () {
		

		function getTpl (type) {
			var ret = {};
			ret['columntitle'] = _columTitle_tpl;
			ret['rowlabel'] = _columTitle_tpl;
			ret['cell'] = _content_tpl;

			return ret[type] || '';
		}

		function checkAnswer () {
			var $content = $('.content_area');
			if($content.length) {
				$content.each(function (index,cnt) {
					// this is the answer,else is 'fixed'
					var currentCell = _responseFills[index];
					if(currentCell.IsFixed == 'false' && currentCell.ParentId != "-1") {
						if(currentCell.ParentId == currentCell.ResponseParentId) {
							//$(this).css('background','none').css('color','green');
						}
					} else if(currentCell.IsFixed == 'true'){
						$(this).siblings('.tbl_answer').remove();
						$(this).css('background','none').css('color','green');
					}
				});
			}
		}

		function renderTable () {
			var tblContent = '';

			$.each(_responses,function (i,rsps) {
				var trContent = '<tr>';

				$.each(rsps,function (j,rsp) {
					var type = rsp.ItemType.toLowerCase();
					trContent += getTpl(type).replace('{data}',rsp.ItemContent);
					if(!rsps[j + 1]) {
						trContent += '</tr>';
					}
				});
				tblContent += trContent;
			});
			$root.html(tblContent);
		}

		function init () {
			_common.render(data,function () {});
			_common.renderLeftSti(data);
			renderTable();
			checkAnswer();
		}

		init();

	})(data);	
};