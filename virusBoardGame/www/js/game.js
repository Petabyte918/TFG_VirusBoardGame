





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
//Si consideramos offset del canvas (deberia ser 0 pero si no..)
//var x_2 = touch.pageX - canvas.offsetLeft;
//var y_2 = touch.pageY - canvas.offsetTop
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

	//Movil - ordenador
	cv.ontouchstart = function(event) {
		var touch = event.touches[0];
	//cv.onmousedown = function(event) {
		//var touch = event;
		console.log("Onmousedown");
		for (var i = 0; i < objetos.length; i++) {
			if (objetos[i].x < touch.pageX
			  && (objetos[i].width + objetos[i].x > touch.pageX)
			  && objetos[i].y < touch.pageY
			  && (objetos[i].height + objetos[i].y > touch.pageY)) {
				objetoActual = objetos[i];
				console.log("Objeto "+i+" TOCADO");
				inicioY = touch.pageY - objetos[i].y;
				inicioX = touch.pageX - objetos[i].x;
				break;
			}
		}
	}
	//Movil - ordenador
	cv.ontouchmove = function(event) {
		var touch = event.touches[0];
	//cv.onmousemove = function(event) {
		//var touch = event;
		console.log("Onmousemove");
		if (objetoActual != null) {
			objetoActual.x = touch.pageX - inicioX;
			objetoActual.y = touch.pageY - inicioY;
		}
		actualizar();
	}
	//Movil - ordenador
	cv.ontouchend = function(event) {
	//cv.onmouseup = function(event) {
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
	//Da error en el navegador, pero no para la ejecucion
	screen.orientation.lock('landscape');

	simularDatosIniciales();

	Engine.initializeCanvas();
	Engine.initializeJugadores();
	Engine.initDeckOfCards();

	shuffleDeck(deckOfCards);

})


