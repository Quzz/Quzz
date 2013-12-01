var gameId = "";
var players = [];
var socket = io.connect();

var	$participants = $("#participants");

socket.on('init', function(data) {
	gameId = data.gameId;
});

socket.on('reload', function() {
	location.reload();
});

socket.on('player_connected', function(player) {
	players.push(player);
	refreshPlayers();
});

socket.on('got_question', function(question) {
	console.log(question);
	socket.emit('start_choices', question.answers);
});

$("#ready-button").click(function() {

});

$("#ready-button").hide();

function refreshPlayers() {
	$participants.empty();
	$.each(players, function(index, value) {
		var $playerItem = $("<li />").text(value.name);
		console.log($playerItem);
		$participants.append($playerItem);
	});

	if(players.length > 1) {
		$("#ready-button").show();
	}
}

function startGame() {
	socket.emit('request_question');
}