$(document).ready(function(){
	$("#get-data-btn").click(Listener.getData);
});

var Listener = {
	getData : function(){
		Listener.getTaobaoData();
		Listener.getPaiPaiData();
		Listener.getBuyData();
	},
	getTaobaoData:function(){
		$.ajax({
			url: "/getTaobaoData/"+$("#data-info").val(),
			dataType : "json",
			type : "get",
			cache : false,
			success : function(data){
				console.log("taobao===============");
				console.log(data);
			},
			error : function(){
				alert("获取淘宝数据失败");
			}
		});
	},
	getPaiPaiData:function(){
		$.ajax({
			url: "/getPaiPaiData/"+$("#data-info").val(),
			dataType : "json",
			type : "get",
			cache : false,
			success : function(data){
				console.log("paipai===============");
				console.log(data);
			},
			error : function(){
				alert("获取拍拍数据失败");
			}
		});
	},
	getBuyData:function(){
		$.ajax({
			url: "/getBuyData/"+$("#data-info").val(),
			dataType : "json",
			type : "get",
			cache : false,
			success : function(data){
				console.log("buy===============");
				console.log(data);
			},
			error : function(){
				alert("获取京东数据失败");
			}
		});
	}
}
