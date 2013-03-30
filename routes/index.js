
/*
 * GET home page.
 */
 var controller = require('../controller/GetData');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
exports.getTaobaoData = function(req,res){
	controller.getTaobaoData(res);
};
exports.getPaiPaiData = function(req,res){
	controller.getPaiPaiData(res);
};
exports.getBuyData = function(req,res){
	controller.getBuyData(res);
};