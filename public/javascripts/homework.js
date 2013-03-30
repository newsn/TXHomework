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
			url:encodeURI("/getTaobaoData/"+$("#data-info").val()),
			dataType : "json",
			type : "get",
			cache : false,
			success : function(data){
				Listener.resolveTaobaoData(data.data);
			},
			error : function(){
				alert("获取淘宝数据失败");
			}
		});
	},
	getPaiPaiData:function(){
		$.ajax({
			url:"/getPaiPaiData/"+$("#data-info").val(),
			dataType : "json",
			type : "get",
			cache : false,
			success : function(data){
				Listener.resolvePaiPaiData(data.data);
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
				Listener.resolveBuyData(data.data);
			},
			error : function(){
				alert("获取京东数据失败");
			}
		});
	},
	resolveTaobaoData: function(data){
		for(var i=0,len=data.length;i<len;i++){
			var node = $(".taobao-ul .hidden-item").clone(false);
			$(node).find(".p-name").text("商品名称:"+data[i].name);
			$(node).find(".p-price").text("价格:"+data[i].price);
			$(node).find(".p-link a").attr("herf",data[i].link);
			$(node).removeClass("hidden-item").appendTo(".taobao-ul");
		}
	},
	resolvePaiPaiData: function(data){
		for(var i=0,len=data.length;i<len;i++){
			var node = $(".paipai-ul .hidden-item").clone(false);
			$(node).find(".p-name").text("商品名称:"+data[i].name);
			$(node).find(".p-price").text("价格:"+data[i].price);
			$(node).find(".p-link a").attr("herf",data[i].link);
			$(node).removeClass("hidden-item").appendTo(".paipai-ul");
		}
	},
	resolveBuyData:function(data){
		for(var i=0,len=data.length;i<len;i++){
			var node = $(".buy-ul .hidden-item").clone(false);
			$(node).find(".p-name").text("商品名称:"+data[i].name);
			$(node).find(".p-price").text("价格:"+data[i].price);
			$(node).find(".p-link a").attr("herf",data[i].link);
			$(node).removeClass("hidden-item").appendTo(".buy-ul");
		}
	}
}
