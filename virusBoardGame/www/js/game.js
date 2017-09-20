





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
var windowWidth, windowHeight = 0;
function actualizar(){
	cx.fillStyle = '#f0f0f0';
	cx.fillRect(0,0,windowWidth,windowHeight);
	for (var i = 0; i < objetos.length; i++){
		cx.fillStyle = objetos[i].color;
		cx.fillRect(objetos[i].x, objetos[i].y, objetos[i].width, objetos[i].height);
	}
}
//1.-, 2.-
window.onload = function(){
	objetos = [];
	cv = document.getElementById('canvas');
	windowWidth = window.innerWidth;
	windowHeight = window.innerHeight;
	cv.width = windowWidth;
	cv.height = windowHeight;
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
	//cv.ontouchstart = function(event) {
		//var touch = event.touches[0];
	cv.onmousedown = function(event) {
		var touch = event;
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
	//cv.ontouchmove = function(event) {
		//var touch = event.touches[0];
	cv.onmousemove = function(event) {
		var touch = event;
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

function renderBgCards(widthCarta, heightCarta, posCarta1, posCarta2, posCarta3){
	
	cx.fillStyle = '#000000';
	cx.fillRect(posCarta1[0], posCarta1[1], widthCarta, heightCarta);
	cx.fillRect(posCarta2[0], posCarta2[1], widthCarta, heightCarta);
	cx.fillRect(posCarta3[0], posCarta3[1], widthCarta, heightCarta);
	for (var i = 0; i < jugadores.length; i++){
		if (usuario == jugadores)
	}
}

function ponerJugadores(numJugadores, numMaquinas){
	switch(numJugadores + numMaquinas){
		case 1:
			alert("Alert: ¡estas jugando solo colega!");
		case 2:
			
			//Posiciones y tamaños estaran proporcionados con el tamaño de la pantalla
			var widthDisponible = windowWidth / 3;
			var heightDisponible = windowHeight / 3;
			//20px sera la separacion entre cartas * 2 = 40
			var widthCarta = widthDisponible / 3 - 40;
			//La altura de la carta va en relacion a su anchura para que no se deforme (1-1.5)
			//posCartaX = [width, height, rotacion]
			var heightCarta = widthCarta * 1.5;
			var posCarta1 = [espDisponible, heightDisponible, 0];
			var posCarta2 = [espDisponible + 20, heightDisponible, 0];
			var posCarta3 = [espDisponible + 40, heightDisponible, 0];
			var posCartasJug1 = [posCarta1, posCarta2, posCarta3];
			posCartasJugadores.push(posCartasJugadores);
			renderBgCard(widthCarta, heightCarta, posCarta1, posCarta2, posCarta3);
		case 3:

		case 4:

		case 5:

		case 6:

		default:
			alert("Numero de jugadores erroneo");
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

	shuffle(deckOfCards);

})


