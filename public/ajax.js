;(function(win,undefined){

	// jinuxAjax挂载到window上
	win.jinuxAjax = function(opt){
		ieAjaxInit();
		//默认参数配置
		var defaultOpt = {
			url:'',
			type: 'GET',
			data: null,
			contentType: 'text/plain;charset=UTF-8',
			success: fn,
			error: fn,
			complete: fn
		};

		//参数对象继承获取新参数对象
		var opt = Object.assign({}, defaultOpt, opt);

	}

	//将json格式数据转成application/x-www-form-urlencode格式数据
	function encodeFormData(data){
		if(!data) return '';
		var pairs = [];
		for(var name in data){
			if(!data.hasOwnProperty(name)) continue;
			if(typeof data[name] === 'function') continue;
			var value = data[name].toString();
			name = encodeURIComponent(name.replace('%20','+'));
			value = encodeURIComponent(value.replace('%20','+'));
			pairs.push(name + '=' + value);
		}
		return pairs.join('&');
	}

	//ajax的get请求函数
	function getData(url,data,success,error,complete){

	}

	//ajax的post请求函数
	function postData(url,data,success,error,complete){

	}
	// 定义一个空函数
	function fn(){}

	// 如果是ie6，创建XMLHttpRequest对象
	function ieAjaxInit(){
		if(win.XMLHttpRequest === undefined){
			win.XMLHttpRequest = function(){
				try {
					return new ActiveXObject('Msxml2.XMLHTTP.6.0');
				}
				catch (e1) {
					try {
						return new ActiveXObject('Msxml2.XMLHTTP.3.0');
					}
					catch (e2) {
						throw new Error('不支持XMLHttpRequest');
					}
				}
			}
		}
	}

	//

})(window);
