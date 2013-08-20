Preview.SimpleCategorization = Preview.SimpleCategorization || {};

$(document).ready(function () {
	Preview.Common.loadData('../data/6.SimpleCategorizationWithAnswers.json',Preview.SimpleCategorization);
});

Preview.SimpleCategorization = function (data) {
	
	var $root = $('.category_container')
	 ,	CATEGORY_C = '.category'
	 ,	_common = Preview.Common
	 ,	_cateContainer_tpl = '<div class="category"></div>'
	 ,	_categoryItem_tpl = '<div class="cate_holder"><div class="cate_item" title="{data}"><p>{data}</p></div><div class="cate_answer"><img src="{src}"/></div></div>'
	 ,	_categories = (data.Content.Questions || data.Content.Question)[0].Categories
	 ,	_responseFills = (data.Content.Questions || data.Content.Question)[0].ResponseFills;

	return (function () {
		

		function renderCategory () {
			var content = '';
			if(_categories.length) {
				$.each(_categories,function (index,cate) {
					content += _cateContainer_tpl;
				});				
			}

			$root.html(content);
		}

		function renderCateItem () {
			if(_responseFills.length) {
				var content = '';
				$.each(_responseFills,function  (index,fill) {
					if(fill.Isfixed != 'false') {
						var isCorrect = fill.CategoryId == fill.ResponseCategoryId ? '../images/ok_btn.png' : '../images/close_btn.png';
						content = _categoryItem_tpl.replace('{data}',unescape(fill.ItemContent)).replace('{data}',unescape(fill.ItemContent)).replace('{src}',isCorrect);
						$('.category').eq(fill.CategoryId - 1).append(content);
					}
				});				
			}
		}


		function init () {
			_common.render(data,function () {});
			_common.renderLeftSti(data);
			renderCategory();
			renderCateItem();
		}

		init();

	})(data);
}