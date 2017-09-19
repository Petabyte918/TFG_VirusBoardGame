





function playSound(soundResource){
	if (soundResource) {
		var currentAudio = new Audio();
		currentAudio.src = soundResource + ".wav";
		currentAudio.play();
	} else {
		console.log("Error: not soundResource");
	}
}

//TELEFONO
/**
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
		width: 200, height: 400,
		color: '#00f'
	});
	objetos.push({
		x: 300, y: 150,
		width: 100, height: 200,
		color: '#f00'
	});
	objetos.push({
		x: 120, y: 150,
		width: 100, height: 200,
		color: '#0f0'
	});

	cv.ontouchstart = function(event) {
		console.log("Onmousedown");
		for (var i = 0; i < objetos.length; i++) {
			if (objetos[i].x < event.layerX
			  && (objetos[i].width + objetos[i].x > event.layerX)
			  && objetos[i].y < event.layerY
			  && (objetos[i].height + objetos[i].y > event.layerY)) {
				objetoActual = objetos[i];
				console.log("Objeto "+i+" TOCADO");
				inicioY = event.layerY - objetos[i].y;
				inicioX = event.layerX - objetos[i].x;
				break;
			}
		}
	}

	cv.ontouchmove = function(event) {
		console.log("Onmousemove");
		if (objetoActual != null) {
			objetoActual.x = event.layerX - inicioX;
			objetoActual.y = event.layerY - inicioY;
		}
		actualizar();
	}

	cv.ontouchend = function(event) {
		console.log("Onmouseup");
		objetoActual = null;
	}
}
**/

//ORDENADOR

var cv, cx, objetos, objetoActual = null;
var inicioX = 0, inicioY = 0;
function actualizar(){
	cx.fillStyle = '#f0f0f0';
	cx.fillRect(0,0,1000,700);
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
		width: 200, height: 400,
		color: '#00f'
	});
	objetos.push({
		x: 300, y: 150,
		width: 100, height: 200,
		color: '#f00'
	});
	objetos.push({
		x: 120, y: 150,
		width: 100, height: 200,
		color: '#0f0'
	});

	cv.onmousedown = function(event) {
		console.log("Onmousedown");
		console.log("Event: "+event);
		//console.log("event.layerX: "+event.layerX);
		//console.log("event.layerY: "+event.layerY);
		//console.log("event.pageX: "+event.pageX);
		//console.log("event.pageY: "+event.pageY);
		for (var i = 0; i < objetos.length; i++) {
			if (objetos[i].x < event.layerX
			  && (objetos[i].width + objetos[i].x > event.layerX)
			  && objetos[i].y < event.layerY
			  && (objetos[i].height + objetos[i].y > event.layerY)) {
				objetoActual = objetos[i];
				console.log("Objeto "+i+" TOCADO");
				inicioY = event.layerY - objetos[i].y;
				inicioX = event.layerX - objetos[i].x;
				break;
			}
		}
	}

	cv.onmousemove = function(event) {
		console.log("Onmousemove");
		if (objetoActual != null) {
			objetoActual.x = event.layerX - inicioX;
			objetoActual.y = event.layerY - inicioY;
		}
		actualizar();
	}

	cv.onmouseup = function(event) {
		console.log("Onmouseup");
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
	console.log("Orientation before lock is: "+screen.orientation.type);
	//Dara error en las pruebas de ordenador, pero no deberia ocurrir nada mas
	screen.orientation.lock('landscape');

	simularDatosIniciales();

	Engine.initializeCanvas();
	Engine.initializeJugadores();
	Engine.initDeckOfCards();

	shuffleDeck(deckOfCards);

})


