var Hashids = require("hashids"),
    hashids = new Hashids("Erdbeermarmelade!");

/*
 * GET home page.
 */

exports.index = function(req, res) {
  if(!req.session.gameId) {
    req.session.gameId = hashids.encrypt(new Date().getTime());
  }
  res.render('index', { title: 'Heinz' , gameId: req.session.gameId});
};

/*
 * GET mobile client. 
 */
exports.client = function(req, res) {
  req.session.gameId = req.params.gameId;
  
  res.render('client', {title: 'Ulfried'});
}