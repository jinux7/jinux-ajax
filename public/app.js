var files = document.querySelector('#file');
files.onchange = function(ev){
	console.log(files.files);
}
jinuxAjax({
	url: '/api',
	type: 'GET',
	//contentType: 'application/json',
	timeOut: 2000,
	data: {
		name: 'xiaohong',
		age: 21
	},
	before: function(){console.log('before send')},
	success: function(res){
		console.log(res)
	},
});