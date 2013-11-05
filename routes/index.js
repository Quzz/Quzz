var Hashids = require("hashids"),
    hashids = new Hashids("Erdbeermarmelade!", 1);

var qrCode = require('qrcode-npm');

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

  var fullURL = req.protocol + "://" + req.get('host') + req.url;
  var clientURL = fullURL + "client/" + session.gameId;

  var qr = qrCode.qrcode(4, 'M');
  qr.addData(clientURL);
  qr.make();

  res.render('index', {title: 'Heinz', gameId: req.session.gameId, qrCode: qr.createImgTag(4)});


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