var gameId = "";

var socket = io.connect('http://localhost');

socket.on('init', function(data) {
	gameId = data.gameId;


});

socket.on('reload', function() {
	location.reload();
});

socket.on('got_question', function(question) {
	console.log(question);
	socket.emit('start_choices', question.answers);
});

function startGame() {
	socket.emit('request_question');
}