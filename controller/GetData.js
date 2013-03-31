var http = require('http');
var iconv = require('iconv-lite'); 
var BufferHelper = require('bufferhelper');
var nodecr = require('nodecr');
var request = require('request');
var fs = require('fs');
var $ = require('jquery');
var TaobaoOption = {
	host:'s.taobao.com',
    path:''
};
var PaiPaiOption = {
	host:'search1.paipai.com',
    path:''
};
var BuyOption = {
	host:'search.jd.com',
    path:''
};
exports.getTaobaoData = function(res,info){
	TaobaoOption.path = "http://s.taobao.com/search?q="+info+"&app=detail"
	Tool.sendRequset(TaobaoOption,true,"taobao",res);
}
exports.getPaiPaiData = function(res,info){
	PaiPaiOption.path = "http://search1.paipai.com/cgi-bin/comm_search1?KeyWord="+info;
	Tool.sendRequset(PaiPaiOption,false,"paipai",res);
}
exports.getBuyData = function(res,info){
	BuyOption.path = "http://search.jd.com/Search?keyword="+info+"&enc=utf-8";
	Tool.sendRequset(BuyOption,true,"buy",res);
}


/*优化*/
var Tool = {
	imagecount : 0,
	sendRequset : function (option,change,store,dataRes){
		if(change == true){
			var bufferHelper = new BufferHelper();
			var req=http.request(option,function(res){
			    res.on('data',function(chunk){
			        bufferHelper.concat(chunk);
			    });
			    res.on('end',function(){ 
				    if(store == "taobao"){
				    	dataRes.writeHead(200, {'content-type': 'text/json' });
						dataRes.write( JSON.stringify({ data : Tool.resolveTaobaoData(iconv.decode(bufferHelper.toBuffer(),'GBK')) }) );
						dataRes.end('\n');
				    }
					else if(store == "buy"){
						Tool.resolveBuyData(iconv.decode(bufferHelper.toBuffer(),'GBK'),function(data){
							dataRes.writeHead(200, {'content-type': 'text/json' });
							dataRes.write( JSON.stringify({ data : data}) );
							dataRes.end('\n');
						});
					}
					else if(store == "paipai-recdirect"){
						dataRes.writeHead(200, {'content-type': 'text/json' });
						dataRes.write( JSON.stringify({ data : Tool.resolvePaiPaiData(iconv.decode(bufferHelper.toBuffer(),'GBK')) }) );
						dataRes.end('\n');
					}
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
				    Tool.redirectPaiPai(str,dataRes);
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
	redirectPaiPai : function(string,dataRes){
		var redirect_src = $(string).find("a").attr("HREF");
		var redirect_obj = {
			host:'search1.paipai.com',
			path:redirect_src
		}
		Tool.sendRequset(redirect_obj,true,"paipai-recdirect",dataRes);
	},
	resolvePaiPaiData:function(string){
		var data = [];
		var nodes = $(string).find("#itemList li");
		for(var i=0,len=$(nodes).length;i<len;i++){
			var node = nodes[i];
			var obj = {
				name : $(node).find(".item-show h3").text(),
				link : (function (){
					var as = $(node).find(".item-show h3 a");
					var a = as[$(node).find(".item-show h3 a").length-1];
					return $(a).attr("href");
				})(),
				price : $(node).find(".price p em").text()
			};
			data.push(obj);
		}
		return data;
	},
	resolveBuyData : function(string,callback){
		var data = [];
		var nodes = $(string).find(".list-h li");
		for(var i=0,len=$(nodes).length;i<len;i++){
			(function(){
				var node = nodes[i];
				analysisImage($(node).find(".p-price img").attr("data-lazyload"), function(price){
					var obj = {
						name : $(node).find(".p-name a").text(),
						link : $(node).find(".p-name a").attr("href"),
						price : price
					};
					data.push(obj);
					if(data.length == len - 1){
						callback(data);
					}
				});
			})();	
		}
	}
};

function analysisImage (src,callback){
	var imageOption = {
		host:'jprice.360buyimg.com',
    	path:src
	};
	var sys = require('sys')
	var exec = require('child_process').exec;
	var count = Tool.imagecount;
	Tool.imagecount++;
	request(src).pipe(fs.createWriteStream("public/images"+"/"+count+'.png')).on("close",function(){
		exec("gocr -i public/images/"+count+".png  -C 0-9.", function (error, stdout, stderr) {
			console.log(stdout);
			callback("¥"+stdout.substr(1));
			if (error !== null) {
				console.log('exec error: ' + error);
			}
		});
	});
}

