var http = require('http');
var iconv = require('iconv-lite'); 
var BufferHelper = require('bufferhelper');
var TaobaoOption = {
	host:'s.taobao.com',
    path:'http://s.taobao.com/search?q=iphone5'
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
	Tool.sendRequset(TaobaoOption,true);//转后没乱码
}
exports.getPaiPaiData = function(){
	Tool.sendRequset(PaiPaiOption,false);//没乱码
}
exports.getBuy = function(){
	Tool.sendRequset(BuyOption,true);//转后没乱码
}

function resolveTaobaoData(){

}
function resolvePaiPaiData(){

}
function resolveBuyData(){

}

/*优化*/
var Tool = {
	sendRequset : function (option,change){
		if(change == true){
			var bufferHelper = new BufferHelper();
			var req=http.request(option,function(res){
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