
/*
 * GET home page.
 */
 var controller = require('../controller/GetData');

exports.index = function(req, res){
	controller.getTaobaoData();
  res.render('index', { title: 'Express' });
};