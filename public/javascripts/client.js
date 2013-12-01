var gameId = "";

var socket = io.connect();


function showWaiting() {
	$("#waiting").show();
}

function hideWaiting() {
	$("#waiting").hide();
}

socket.on('init', function(data) {
	gameId = data.gameId;
});

socket.on('reload', function() {
	location.reload();
});

socket.on('make_choice', function(data) {
	alert(data);
});

$("#button-submit-name").click(function() {
	var name = $("#input-name").val();
	if(name !== "") {
		socket.emit('player_inited', {name: name, id: socket.id});
		$("#intro").hide();
		showWaiting();
	}
});

hideWaiting();