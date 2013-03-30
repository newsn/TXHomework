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
		console.log("TaoBao");
	},
	getPaiPaiData:function(){
		console.log("PaiPai");
	},
	getBuyData:function(){
		console.log("Buy");
	}
}
