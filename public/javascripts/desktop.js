var gameId = "";

var socket = io.connect('http://localhost');

socket.on('init', function(data) {
	gameId = data.gameId;
	socket.emit('type', {type: "DESKTOP"});
});

socket.on('reload', function() {
	location.reload();
});



socket.on('init_finished', function(data) {
	console.log("Init Finished!");

	socket.emit('request_question');
});

socket.on('got_question', function(question) {
	console.log(question);
})