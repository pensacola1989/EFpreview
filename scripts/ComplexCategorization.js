Preview.ComplexCategorization = Preview.ComplexCategorization || {};

$(document).ready(function () {
	Preview.Common.loadData('../data/ComplexCategorizationWithAnswers.json',Preview.ComplexCategorization);
});

Preview.ComplexCategorization = function (data) {
	var _common = Preview.Common
	 ,	$root = $('.table').find('tbody')
	 ,	_columTitle_tpl = '<td class="tableTitle">{data}</td>'
	 ,	_content_tpl = '<td class="tableContent"><div class="content_area">{data}</div><div class="tbl_answer"><img style="height:30px;width:30px;" src="{src}"/></div></td>'
	 ,	_dis_tpl = '<td class="tableContent"><div class="content_area">{data}</div></td>'
	 ,	_responses = data.Content.Questions[0].Responses
	 ,	_responseFills = data.Content.Questions[0].ResponseFill;

	return (function () {
		
		function renderDis () {
			var ret = [];
			$.each(_responseFills,function (index,fill) {
				if(fill.ParentId == '-1') {
					ret.push(fill)
				}
			});
			if(ret.length) {
				var content = '';

				$.each(ret,function (index,r) {
					content += _dis_tpl.replace('{data}',r.ItemContent);
				});
				$('.cate_dis').html(content);
			}
		}

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
							$(this).siblings('.tbl_answer').find('img').attr('src','../images/ok_btn.png');
							//$(this).css('background','none').css('color','green');
						} else {
							$(this).siblings('.tbl_answer').find('img').attr('src','../images/close_btn.png');
						}
					} else if(currentCell.IsFixed == 'true'){
						$(this).siblings('.tbl_answer').remove();
						$(this).css('background','none').css('color','#409fcf');
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
			renderDis();
		}

		init();

	})(data);	
};