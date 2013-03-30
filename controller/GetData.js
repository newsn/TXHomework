var http = require('http');
var iconv = require('iconv-lite'); 
var BufferHelper = require('bufferhelper');
var $ = require('jquery');
var TaobaoOption = {
	host:'s.taobao.com',
    path:'http://s.taobao.com/search?q=iphone5&app=detail'
};
var PaiPaiOption = {
	host:'search.yihaodian.com',
    path:'http://search.yihaodian.com/s2/c0-0/kiphone5'
};
var BuyOption = {
	host:'search.jd.com',
    path:'http://search.jd.com/Search?keyword=iphone5&enc=utf-8'
};
exports.getTaobaoData = function(){
	Tool.sendRequset(TaobaoOption,true,"taobao");//转后没乱码
}
exports.getPaiPaiData = function(){
	Tool.sendRequset(PaiPaiOption,false,"paipai");//没乱码
}
exports.getBuyData = function(){
	Tool.sendRequset(BuyOption,true,"buy");//转后没乱码
}


/*优化*/
var Tool = {
	sendRequset : function (option,change,store){
		if(change == true){
			var bufferHelper = new BufferHelper();
			var req=http.request(option,function(res){
			    res.on('data',function(chunk){
			        bufferHelper.concat(chunk);
			    });
			    res.on('end',function(){ 
				    //console.log(iconv.decode(bufferHelper.toBuffer(),'GBK'));
				    if(store == "taobao")
				     Tool.resolveTaobaoData(iconv.decode(bufferHelper.toBuffer(),'GBK'));
					else if(store == "buy")
					 Tool.resolveBuyData(iconv.decode(bufferHelper.toBuffer(),'GBK'));
				});
			});
			req.on('error',function(e){
			    console.log('Error got: '+e.message);
			});
			req.end();
		}
		else{
			var req=http.request(PaiPaiOption,function(res){
				var str = "";
			    res.on('data',function(chunk){
			        str+=chunk;
			    });
			    res.on('end',function(){ 
				    console.log(str);
				});
			});
			req.on('error',function(e){
			    console.log('Error got: '+e.message);
			});
			req.end();
		}
	},
	resolveTaobaoData : function(string){
		var data = [];
		var nodes = $(string).find(".list-item");
		for(var i=0,len=$(nodes).length;i<len;i++){
			var node = nodes[i];
			var obj = {
				name : $(node).find(".summary a").text(),
				link : $(node).find(".summary a").attr("href"),
				price : (function(){
					var now_price = $(node).find(".price").text();
					var index = now_price.lastIndexOf("￥");
					if(index!=0){
						return now_price.substr(now_price,index,now_price.length-1);
					}
					else{
						return now_price;
					}
				})()
			};
			data.push(obj);
		}
		return data;
	},
	resolvePaiPaiData : function(string){
		var data = [];
		//var nodes = $(string).find("#itemList li");
	},
	resolveBuyData : function(string){
		var data = [];
		
	}
};



/*历史记录*/
/*function sendReqToTaobao(){
	var bufferHelper = new BufferHelper();
	var req=http.request(TaobaoOption,function(res){
	    res.on('data',function(chunk){
	        bufferHelper.concat(chunk);
	    });
	    res.on('end',function(){ 
		    console.log(iconv.decode(bufferHelper.toBuffer(),'GBK'));
		});
	});
	req.on('error',function(e){
	    console.log('Error got: '+e.message);
	});
	req.end();
}
function sendReqToPaiPai(){
	var req=http.request(PaiPaiOption,function(res){
		var str = "";
	    res.on('data',function(chunk){
	        str+=chunk;
	    });
	    res.on('end',function(){ 
		    console.log(str);
		});
	});
	req.on('error',function(e){
	    console.log('Error got: '+e.message);
	});
	req.end();
}
function sendReqToBuy(){
	var bufferHelper = new BufferHelper();
	var req=http.request(BuyOption,function(res){
	    res.on('data',function(chunk){
	        bufferHelper.concat(chunk);
	    });
	    res.on('end',function(){ 
		    console.log(iconv.decode(bufferHelper.toBuffer(),'GBK'));
		});
	});
	req.on('error',function(e){
	    console.log('Error got: '+e.message);
	});
	req.end();
}*/

/*function resolveTaobaoData(){

}
function resolvePaiPaiData(){

}
function resolveBuyData(){

}*/