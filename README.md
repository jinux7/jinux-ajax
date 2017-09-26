##这是一个极其简单的ajax封装函数库，都是一些简单的基础功能
jinux-ajax库API

使用：
jinuxAjax({
			url: String,
			type: String,
			data: json,
			contentType: String,
			files: Array,
			timeOut: Int,
			before: Function,
			success: Function,
			error: Function,
			complete: Function
});
参数说明：
-
url -> 请求的地址
-
type -> 'GET' 或者 'POST' 两种请求方式，可不此属性，默认是 'GET'
-
data -> 请求所携带的数据，如
{
	name: "admin",
	password: 123456
}
-
contentType -> post请求默认为: 'application/x-www-form-urlencode',发送参数为 name="admin"&password=123456 格式
				'application/json'，发送的参数以json格式发送
				'multipart/form-data'，这个主意，当有文件上传的时候需要设置此属性	
-
files -> 这个属性是一个input上传文件夹数组，需要配合'multipart/form-data'这个属性使用
-
timeOut -> 设置超时毫秒数，不写默认5000ms
-
before -> 请求之前调用函数，无参数
-
success -> 请求成功回掉函数，参数为服务器端返回的数据
-
error -> 请求失败回掉函数，参数为rquest对象
-
complete -> 请求完成之后回掉函数(无论成功还是失败)都执行