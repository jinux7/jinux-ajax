这是一个极其简单的ajax封装函数库，都是一些简单的基础功能
-----
jinux-ajax库API
-----
使用：<br/>
jinuxAjax({<br/>
>			url: String,
>			type: String,
>			data: json,
>			contentType: String,
>			files: Array,
>			timeOut: Int,
>			before: Function,
>			success: Function,
>			error: Function,
>			complete: Function
});<br/>

参数说明：<br/>

##### url -> 请求的地址
-----
##### type -> 'GET' 或者 'POST' 两种请求方式，可不此属性，默认是 'GET'
-----
##### data -> 请求所携带的数据，如
{<br/>
>	name: "admin",<br/>
>	password: 123456<br/>
}<br/>
-----
##### contentType -> post请求默认为: 'application/x-www-form-urlencoded',发送参数为 name="admin"&password=123456 格式
				'application/json'，发送的参数以json格式发送
				'multipart/form-data'，这个主意，当有文件上传的时候需要设置此属性	
-----
##### files -> 这个属性是一个input上传文件夹数组，需要配合'multipart/form-data'这个属性使用
-----
##### timeOut -> 设置超时毫秒数，不写默认5000ms
-----
##### before -> 请求之前调用函数，无参数
-----
##### success -> 请求成功回掉函数，参数为服务器端返回的数据
-----
##### error -> 请求失败回掉函数，参数为rquest对象
-----
##### complete -> 请求完成之后回掉函数(无论成功还是失败)都执行
-----
`注意事项：在post请求，携带'multipart/form-data'数据的时候，比如FormData类型数据，不要request.setRequestHeader('Content-Type','multipart/form-data');
		  在send数据的时候，ajax发现是FormData类型数据，会自动设置请求头的Content-Type类型，自己设置后台接收不到数据`
=====
=====
### 服务器启动 npm server <br/>
-----
##### http://127.0.0.1:3000/test/get.html 
-----
##### /uploadFiles文件夹是存放测试上传文件的地方
-----