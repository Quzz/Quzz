var socket = io.connect('http://localhost');

socket.on('question', function (data) {
	console.log("Der Server so: " + data.question);
	console.log("Und daraufhin ich so: Erdbeermarmelade!")
	socket.emit('answer', { answer: 'Erdbeermarmelade!' });
});

socket.on('reload', function() {
	location.reload();
});