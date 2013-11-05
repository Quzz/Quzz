
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var app = express();

var server = require('http').createServer(app);
var path = require('path');

var io = require('socket.io').listen(server);

var MemoryStore = express.session.MemoryStore;
var sessionStore = new MemoryStore();
var cookieParser = express.cookieParser('your secret sauce');

var SessionSockets = require('session.socket.io');
var sessionSockets = new SessionSockets(io, sessionStore, cookieParser);

var Hashids = require("hashids"),
    hashids = new Hashids("Erdbeermarmelade!");

app.configure(function() {
  // all environments
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(cookieParser);
  app.use(express.session({store: sessionStore}));
  app.use(app.router);
  app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
  // development only
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/client/:gameId', routes.client);

sessionSockets.on('connection', function (err, socket, session) {
  if(!session) {
    socket.emit('reload');
  } else {
    var gameId = session.gameId;
    socket.emit('init', { gameId: gameId });
    socket.join(gameId);

    socket.on('request_question', function(data) {
      if(session.isDesktop) {
        var question = getRandomQuestion();
        socket.emit('got_question', question);
      } else {
        session.emit('error', {message: 'WTF are you doin\'?!'});
      }
    });
  }
});

function getRandomQuestion() {
  return {question: "Was ist der Sinn des Lebens?", answers: ["42", "Deine Mudda", "Heinz Erhardts Witze", "Gibts nicht idh."], correctAnswer: 0};
}

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
