
/*
 * GET home page.
 */
 var controller = require('../controller/GetData');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
exports.getTaobaoData = function(req,res){
	//console.log(req.params.info);
	controller.getTaobaoData(res,req.params.info);
};
exports.getPaiPaiData = function(req,res){
	controller.getPaiPaiData(res);
};
exports.getBuyData = function(req,res){
	controller.getBuyData(res);
};