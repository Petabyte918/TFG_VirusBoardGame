

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

function renderBGCards (){
	var widthCarta = posCartasUsuario[0];
	var heightCarta = posCartasUsuario[1];
	var posCarta1 = posCartasUsuario[2];
	var posCarta2 = posCartasUsuario[3];
	var posCarta3 = posCartasUsuario[4];

	var img = new Image();
	img.src = "img/cardImages/reversoCarta.jpg";
	img.onload = function(){
		cxBG.drawImage(img, posCarta1[0], posCarta1[1], widthCarta, heightCarta);
		cxBG.drawImage(img, posCarta2[0], posCarta2[1], widthCarta, heightCarta);
		cxBG.drawImage(img, posCarta3[0], posCarta3[1], widthCarta, heightCarta);
	}
}

function renderCard() {
	
}


function renderOrgano (widthOrgano, heightOrgano, posOrgano, src, estado){
	var x, y, r = 0;
	var x = posOrgano[0] + widthOrgano / 2;
	var y = posOrgano[1] + heightOrgano / 2;
	var r = widthOrgano / 2;
	//Estados: vacio, normal, enfermo, vacunado
	if (estado == "vacio"){
		cxBG.fillStyle = 'white';
		cxBG.fillRect(posOrgano[0], posOrgano[1], widthOrgano, heightOrgano);
	}
	/** SERAN CIRCULOS
		cx.strokeStyle = "red";
		cx.fillStyle = "blue";
		cx.lineWidth = 5;
		cx.arc(x, y, r, 0, 2 * Math.PI);
		cx.fill();
		cx.stroke();
	}
	**/
}

function ponerJugadores(){
	//Queremos que todos los usuarios esten ubicados en cada dispositivo de la misma forma
	//Empezamos por el jugador propio y vamos colocando en sentido horario hasta completar el bucle
	var widthOrgano = "";
	var heightOrgano = "";
	var posOrgano1, posOrgano2, posOrgano3, posOrgano4 = null;
	for (var i = 0; i < posOrganosJugadores.length; i++){
		//console.log("JUGADOR "+i+1);
		widthOrgano = posOrganosJugadores[i][0];
		heightOrgano = posOrganosJugadores[i][1];
		for (var u = 2; u < 6; u++){
			posOrgano = posOrganosJugadores[i][u];
			//console.log("widthCarta: "+widthCarta);
			//console.log("heightCarta: "+heightCarta);
			//console.log("posCarta1: "+posCarta1);
			//console.log("posCarta2: "+posCarta2);
			//console.log("posCarta3: "+posCarta3);
			renderOrgano(widthOrgano, heightOrgano, posOrgano, "", "vacio");
		}
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

function actualizarCanvas(){
	//Canvas superior transparente con un color no funcional de señal
	//cx.fillStyle = "rgba(0,0,255,0)";
	//cx.fillRect(0, 0, windowWidth, windowHeight);
	cx.clearRect(0, 0, windowWidth, windowHeight);
	for (var i = 0; i < objetos.length; i++){
		cx.fillStyle = objetos[i].color;
		cx.fillRect(objetos[i].x, objetos[i].y, objetos[i].width, objetos[i].height);
	}
}

function moveObjects(){
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
			actualizarCanvas();
		}
		//Movil - ordenador
		//cv.ontouchend = function(event) {
		cv.onmouseup = function(event) {
			console.log("Onmouseup");
			objetoActual = null;
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
		
		Engine.initCanvas();
		Engine.initJugadores();
		Engine.initPosOrganosJugadores();
		Engine.initPosCartasUsuario();
		Engine.initDeckOfCards();

		ponerJugadores();
		renderBGCards();

		//Tricky
		empezarJuego();
			//Aqui hay un orden de cosas que ocurren estamos ignorando la com. servidor-cliente
			//pero prefiero mantener separado cosas que hace el servidor con cosas que hace el cliente

		moveObjects();

	}
})


