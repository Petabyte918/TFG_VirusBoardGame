

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
var cvBG, cxBG = null;
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

function renderBgCards(widthCarta, heightCarta, posCarta1, posCarta2, posCarta3){
	
	cx.fillStyle = '#000000';
	cx.fillRect(posCarta1[0], posCarta1[1], widthCarta, heightCarta);
	cx.fillRect(posCarta2[0], posCarta2[1], widthCarta, heightCarta);
	cx.fillRect(posCarta3[0], posCarta3[1], widthCarta, heightCarta);
}

function ponerJugadores(){
	//Queremos que todos los usuarios esten ubicados en cada dispositivo de la misma forma
	//Empezamos por el jugador propio y vamos colocando en sentido horario hasta completar el bucle
	var widthCarta = "";
	var heightCarta = "";
	for (var i = 0; i < posCartasJugadores.length; i++){
		//console.log("JUGADOR "+i+1);
		var widthCarta = posCartasJugadores[i][0];
		var heightCarta = posCartasJugadores[i][1];
		posCarta1 = posCartasJugadores[i][2];
		posCarta2 = posCartasJugadores[i][3];
		posCarta3 = posCartasJugadores[i][4];
		//console.log("widthCarta: "+widthCarta);
		//console.log("heightCarta: "+heightCarta);
		//console.log("posCarta1: "+posCarta1);
		//console.log("posCarta2: "+posCarta2);
		//console.log("posCarta3: "+posCarta3);
		renderBgCards(widthCarta, heightCarta, posCarta1, posCarta2, posCarta3);
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

	window.onload = function(){
		console.log("Window onload");
		windowWidth = window.innerWidth;
		windowHeight = window.innerHeight;
		//console.log("windowWidth: "+windowWidth);
		//console.log("windowHeight: "+windowHeight);
		objetos = [];

		//Canvas principal
		cv = document.getElementById('canvas');
		cv.width = windowWidth;
		cv.height = windowHeight;
		cx = cv.getContext('2d');
		cx.fillStyle = "rgba(0,0,255,0)";
		cx.fillRect(0,0,windowWidth,windowHeight);

		//Canvas en background
		cvBG = document.getElementById('canvasBG');
		cvBG.width = windowWidth;
		cvBG.height = windowHeight;
		cxBG = cvBG.getContext('2d');
		cxBG.fillStyle = 'MediumSeaGreen';
		cxBG.fillRect(0,0,windowWidth,windowHeight);
		/**objetos.push({
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
		//cv.ontouchend = function(event) {
		cv.onmouseup = function(event) {
			console.log("Onmouseup");
			objetoActual = null;
		}**/
		Engine.initializeCanvas();
		Engine.initializeJugadores();
		Engine.initializePosiciones();
		Engine.initDeckOfCards();

		shuffle(deckOfCards);


		ponerJugadores();
	}
})


