
/*
 * GET home page.
 */
 var controller = require('../controller/GetData');

exports.index = function(req, res){
  controller.getBuyData();
  res.render('index', { title: 'Express' });
};