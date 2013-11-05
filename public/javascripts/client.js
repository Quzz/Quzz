var gameId = "";

var socket = io.connect('http://localhost');

socket.on('init', function(data) {
	gameId = data.gameId;
	socket.send('type', {type: "CLIENT"});
});

socket.on('reload', function() {
	location.reload();
});

socket.on('make_choice', function(data) {
	alert(data);
});