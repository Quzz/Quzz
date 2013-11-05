var Hashids = require("hashids"),
    hashids = new Hashids("Erdbeermarmelade!", 1);

/*
 * GET home page.
 */

exports.index = function(req, res) {
  var session = req.session;
  if(!session.gameId) {
    session.gameId = hashids.encrypt(parseInt(Math.random() * 1000));
  }

  session.isDesktop = true;
  session.isClient = false;

  res.render('index', {title: 'Heinz', gameId: req.session.gameId});

};

/*
 * GET mobile client. 
 */
exports.client = function(req, res) {
  var session = req.session;

  session.gameId = req.params.gameId;
  
  session.isDesktop = false;
  session.isClient = true;

  res.render('client', {title: 'Ulfried'});
}