





function playSound(soundResource){
	if (soundResource) {
		var currentAudio = new Audio();
		currentAudio.src = soundResource + ".wav";
		currentAudio.play();
	} else {
		console.log("Error: not soundResource");
	}
}

var cv, cx, objetos, objetoActual = null;
var inicioX = 0, inicioY = 0;
function actualizar(){
	cx.fillStyle = '#f0f0f0';
	cx.fillRect(0,0,700,400);
	for (var i = 0; i < objetos.length; i++){
		cx.fillStyle = objetos[i].color;
		cx.fillRect(objetos[i].x, objetos[i].y, objetos[i].width, objetos[i].height);
	}
}
window.onload = function(){
	objetos = [];
	cv = document.getElementById('canvas')
	cx = cv.getContext('2d');
	objetos.push({
		x: 0, y: 0,
		width: 100, height: 200,
		color: '#00f'
	});
	objetos.push({
		x: 300, y: 150,
		width: 50, height: 100,
		color: '#f00'
	});
	objetos.push({
		x: 120, y: 150,
		width: 50, height: 100,
		color: '#0f0'
	});

	cv.ontouchstart = function(event) {
	//cv.onmousedown = function(event) {
		for (var i = 0; i < objetos.length; i++) {
			if (objetos[i].x < event.clientX
			  && (objetos[i].width + objetos[i].x > event.clientX)
			  && objetos[i].y < event.clientY
			  && (objetos[i].height + objetos[i].y > event.clientY)) {
				objetoActual = objetos[i];
				inicioY = event.clientY - objetos[i].y;
				inicioX = event.clientX - objetos[i].x;
				break;
			}
		}
	}

	cv.ontouchmove = function(event) {
	//cv.onmousemove = function(event) {
		if (objetoActual != null) {
			objetoActual.x = event.clientX - inicioX;
			objetoActual.y = event.clientY - inicioY;
		}
		actualizar();
	}

	cv.ontouchend = function(event) {
	//cv.onmouseup = function(event) {
		objetoActual = null;
	}
}


function takeCard(){
    if (deckOfCards.length != 0){
    	var drawedCard = deckOfCards.shift();
    	console.log(drawedCard);
    	return drawedCard;
    } else {
    	alert("Oh! No quedan cartas en el mazo!");
        return null;
    }
}

$(document).ready(function(){
	console.log("Document Ready");

	simularDatosIniciales();

	Engine.initializeCanvas();
	Engine.initializeJugadores();
	Engine.initDeckOfCards();

	shuffleDeck(deckOfCards);

})


