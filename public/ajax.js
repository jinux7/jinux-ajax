;(function(window,undefined){

	// jinuxAjax挂载到window上
	window.jinuxAjax = function(opt){
		ieAjaxInit();
		//默认参数配置
		var defaultOpt = {
			url:'',
			type: 'GET',
			data: null,
			contentType: 'application/x-www-form-urlencoded',//'text/plain;charset=UTF-8','application/json','multipart/form-data'
			timeOut: 5000,
			files:[],
			progress: null,
			before: fn,
			success: fn,
			error: fn,
			complete: fn
		};

		//参数对象继承获取新参数对象
		if(Object.assign){
			var opt = Object.assign({}, defaultOpt, opt);
		}else {
			for(var name in defaultOpt){
				defaultOpt[name] = opt[name] || defaultOpt[name];
			}
			var opt = defaultOpt;
		}

		requestData(opt);

	}

	//将json格式数据转成application/x-www-form-urlencoded格式数据
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
	function getData(opt){
		var request = new XMLHttpRequest();
		var timeoutFlag = false; //是否超时
		//启动计时器，做超时处理
		var timer = setTimeout(function(){
			timeoutFlag = true;
			request.abort();
		},opt.timeOut);

		request.open('GET',opt.url +'?'+ encodeFormData(opt.data));
		opt.before(); //请求之前执行before函数
		request.onreadystatechange = function(){
			if(request.readyState === 4){
				if(timeoutFlag) return;
				clearTimeout(timer);
				if(request.status === 200){
					var type = request.getResponseHeader('Content-Type');
					//检查type类型做相应的解析处理
					if(type.indexOf('xml') !== -1 && request.responseXML){ //xml相应
						opt.success(request.responseXML);
					}else if(type.indexOf('application/json') !== -1) { //json相应
						opt.success(JSON.parse(request.responseText));
					}else {
						opt.success(request.responseText);
					}
				}else {
					opt.error(request);
				}
				opt.complete();
			}
		}
		request.send(null);
	}

	//ajax的post请求函数
	function postData(opt){
		var request = new XMLHttpRequest(), sendData=null;
		var timeoutFlag = false; //是否超时
		//启动计时器，做超时处理
		var timer = setTimeout(function(){
			timeoutFlag = true;
			request.abort();
		},opt.timeOut);

		request.open('POST',opt.url);
		request.onreadystatechange = function(){
			if(request.readyState === 4){
				if(timeoutFlag) return;
				clearTimeout(timer);
				if(request.status === 200){
					var type = request.getResponseHeader('Content-Type');
					//检查type类型做相应的解析处理
					if(type.indexOf('xml') !== -1 && request.responseXML){ //xml相应
						opt.success(request.responseXML);
					}else if(type.indexOf('application/json') !== -1) { //json相应
						opt.success(JSON.parse(request.responseText));
					}else {
						opt.success(request.responseText);
					}
				}else {
					opt.error(request);
				}
				opt.complete();
			}
		}
		//处理接收进度事件
		if(opt.progress.enable && request.upload){
			request.upload.onprogress = function(ev){
				if(ev.lengthComputable){
					opt.progress.receiveHandle(ev);
				}
			}
			request.upload.onload = function(ev){
				opt.progress.successHandle(ev);
			}
		}
		
		if(opt.contentType === 'application/x-www-form-urlencoded'){
			request.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
			sendData = encodeFormData(opt.data);
		}else if(opt.contentType === 'application/json') {
			request.setRequestHeader('Content-Type','application/json; charset=utf-8');
			sendData = JSON.stringify(opt.data);
		}else if(opt.contentType === 'multipart/form-data') {
			var fd = new FormData();
			for(var name in opt.data){
				if( !opt.data.hasOwnProperty(name) ) continue;
				if( typeof opt.data[name] === 'function' ) continue; 
				fd.append(name,opt.data[name]);
			}
			for(var i=0; i<opt.files.length; i++){
				fd.append('file'+i,opt.files[i]);
			}
			sendData = fd;
		}

		request.send(sendData);

	}

	//ajax请求函数，在函数内再调用get或者post
	function requestData(opt){
		if(opt.type === 'GET'){
			getData(opt);
		} else {
			postData(opt);
		}
	}

	// 定义一个空函数
	function fn(){}

	// 如果是ie6，创建XMLHttpRequest对象
	function ieAjaxInit(){
		if(window.XMLHttpRequest === undefined){
			window.XMLHttpRequest = function(){
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
