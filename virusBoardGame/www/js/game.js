

function playSound(soundResource){
	if (soundResource) {
		var currentAudio = new Audio();
		currentAudio.src = soundResource + ".wav";
		currentAudio.play();
	} else {
		console.log("Error: not soundResource");
	}
}

var cv, cx, objetos, objetoActual= null;
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

/**function renderCard() {
	var img = new Image();
	img.src = ""
}
(cardType.organo, 'pulmon', 'img/cardImages/organoHueso.png')**/

function renderOrgano (widthOrgano, heightOrgano, posOrgano, src, estado){
	//var x, y, r = 0;
	//var x = posOrgano[0] + widthOrgano / 2;
	//var y = posOrgano[1] + heightOrgano / 2;
	//var r = widthOrgano / 2;
	//Estados: vacio, normal, enfermo, vacunado
	if (estado == "vacio"){
		cxBG.fillStyle = 'white';
		cxBG.fillRect(posOrgano[0], posOrgano[1], widthOrgano, heightOrgano);
	}

	if(estado == "normal"){
		var img1 = new Image();
		img1.src = objetos[0].src;
		img1.onload = function(){
			//console.log("objetos[0] :"+objetos[0]);
			cxBG.drawImage(img1, posOrgano[0], posOrgano[1], widthOrgano, heightOrgano);
		}
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

function asignarJugadoresAPosiciones(){
	var fin = false;
	var i = 0;
	var contPos = null;
	while (fin != true){
		if (jugadores[i] == usuario){
			contPos = 0;
		}

		if (contPos != null){
			jugPorPosicion.push({
				jugador: jugadores[i],
				posicion: posJugadores[contPos]
			})
			console.log("jugPorPosicion :"+jugPorPosicion[contPos].jugador+", "+jugPorPosicion[contPos].posicion);
			contPos++;
		}
		i++;

		if (i == (jugadores.length)){
			i = 0;
		}
		if (contPos == (jugadores.length)){
			fin = true;
		}

	}
}

function nuevaCarta(numCarta){
	var newCard = takeCard();
	console.log("Nueva carta: "+newCard.toString());
	cartasUsuario[numCarta] = newCard;
	objetos[numCarta].src = newCard.picture;
}

function takeCard(){
    if (deckOfCards.length != 0){
    	var drawedCard = deckOfCards.shift();
    	//console.log(drawedCard.toString());
    	return drawedCard;
    } else {
    	alert("Oh! No quedan cartas en el mazo!");
        return null;
    }
}

function actualizarCanvas(){
	//console.log("Actualizar canvas");
	cx.clearRect(0, 0, windowWidth, windowHeight);
	var img1 = new Image();
	if (objetos[0].src != ""){
		img1.src = objetos[0].src;
		img1.onload = function(){
			//console.log("objetos[0] :"+objetos[0]);
			cx.drawImage(img1, objetos[0].x, objetos[0].y, objetos[0].width, objetos[0].height);
		}
	}
	var img2 = new Image();
	if (objetos[1].src != ""){
		img2.src = objetos[1].src;
		img2.onload = function(){
			//console.log("objetos[1] :"+objetos[1]);
			cx.drawImage(img2, objetos[1].x, objetos[1].y, objetos[1].width, objetos[1].height);
		}
	}
	var img3 = new Image();
	if (objetos[2].src != ""){
		img3.src = objetos[2].src;
		img3.onload = function(){
			//console.log("objetos[2] :"+objetos[2]);
			cx.drawImage(img3, objetos[2].x, objetos[2].y, objetos[2].width, objetos[2].height);
		}
	}
}

function moveObjects(){
	var offsetCartasUsuario = 0;
	offsetCartasUsuario = (posCartasUsuario[1] - posCartasUsuario[0]) / 2;

	objetos.push({
		x: posCartasUsuario[2][0], y: posCartasUsuario[2][1] + offsetCartasUsuario,
		xOrigen: posCartasUsuario[2][0], yOrigen: posCartasUsuario[2][1] + offsetCartasUsuario,
		width: posCartasUsuario[0], height: posCartasUsuario[0],
		numCarta: 0,
		src: cartasUsuario[0].picture
	});
	objetos.push({
		x: posCartasUsuario[3][0], y: posCartasUsuario[3][1] + offsetCartasUsuario,
		xOrigen: posCartasUsuario[3][0], yOrigen: posCartasUsuario[3][1] + offsetCartasUsuario,
		width: posCartasUsuario[0], height: posCartasUsuario[0],
		numCarta: 1,
		src: cartasUsuario[1].picture
	});
	objetos.push({
		x: posCartasUsuario[4][0], y: posCartasUsuario[4][1] + offsetCartasUsuario,
		xOrigen: posCartasUsuario[4][0], yOrigen: posCartasUsuario[4][1] + offsetCartasUsuario,
		width: posCartasUsuario[0], height: posCartasUsuario[0],
		numCarta: 2,
		src: cartasUsuario[2].picture
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
		//Solo actualizamos si movemos y hay algun objeto seleccionado y cada cierta diferencia de pixeles
		if (objetoActual != null) {
			objetoActual.x = touch.pageX - inicioX;
			objetoActual.y = touch.pageY - inicioY;
			//console.log("ObjetoActual.x: "+objetoActual.x);
			//console.log("touch.pageX: "+touch.pageX);
			//console.log("inicioX :"+inicioX);
			actualizarCanvas();
		}
	}

	//Movil - ordenador
	//cv.ontouchend = function(event) {
	cv.onmouseup = function(event) {
		console.log("Onmouseup");
		if (objetoActual != null){
			checkCollision();
			actualizarCanvas();
		}
		//	2Eliminar o no objeto
		//	3Agregarlo o no a algun sitio
		//4restablecer coordenadas iniciale
		objetoActual = null;
	}
}

//Devuelve el numero de la pos. donde ha habido colision, 0 si no la ha habido o -1 si hay error
function checkCollision(){
	var movValido = false;
	var colision = 0;
	//En orden de probabilidad de ocurrencia
	//Posicion dejar la carta en su sitio
	if ((objetoActual.x > posCartasUsuario[2][0]) &&
		(objetoActual.x < (posCartasUsuario[4][0] + posCartasUsuario[0])) &&
		(objetoActual.y > posCartasUsuario[2][1]) &&
		(objetoActual.y < (posCartasUsuario[4][1] + posCartasUsuario[1]))) {
		colision = -1;
	}
	//Posicion 1
	else if ((objetoActual.x < ((windowWidth / 6) * 4)) &&
		(objetoActual.x > ((windowWidth / 6) * 2)) &&
		(objetoActual.y > (windowHeight / 3) * 2)) {
		console.log("Colision zona 1");
		colision = 1;
	}
	//Posicion 4
	else if ((objetoActual.x < ((windowWidth / 6) * 4)) &&
		(objetoActual.x > ((windowWidth / 6) * 2)) &&
		(objetoActual.y < (windowHeight / 3))) {
		console.log("Colision zona 4");
		colision = 4;
	}
	//Posicion 2
	else if ((objetoActual.x < ((windowWidth / 6) * 1)) &&
		(objetoActual.y > (windowHeight / 3))) {
		console.log("Colision zona 2");
		colision = 2;
	}
	//Posicion 6
	else if ((objetoActual.x > ((windowWidth / 6) * 5)) &&
		(objetoActual.y > (windowHeight / 3))) {
		console.log("Colision zona 6");
		colision = 6;
	}
	//Posicion 3
	else if ((objetoActual.x < ((windowWidth / 6) * 2)) &&
		(objetoActual.y < (windowHeight / 3))) {
		console.log("Colision zona 3");
		colision = 3;
	}
	//Posicion 5
	else if ((objetoActual.x > ((windowWidth / 6) * 4)) &&
		(objetoActual.y < (windowHeight / 3))) {
		console.log("Colision zona 5");
		colision = 5;
	}
	//Posicion 0 (central = descarte)
	else if ((objetoActual.x < ((windowWidth / 6) * 4)) &&
		(objetoActual.x > ((windowWidth / 6) * 2)) &&
		(objetoActual.y > (windowHeight / 3) * 1) &&
		(objetoActual.y < (windowHeight / 3) * 2)) {
		console.log("Colision zona 0");
		colision = 0;
	}
	//Posicion -1 - Redibujarmos otra vez
	else {
		colision = -1;
		alert("Movimiento invalido");
	}

	manejadorMov(colision, objetoActual.numCarta);

	objetoActual.x = objetoActual.xOrigen;
	objetoActual.y = objetoActual.yOrigen;
}

//Modifica organosJugadoresCli al nuevo estado
function organoNoRepetido(cardType, posDestino){
	for (var i = 0; i < organosJugadoresCli.length; i++){
		if (jugPorPosicion[posDestino-1].jugador == organosJugadoresCli[i].jugador){
			switch(cardType){
			case "hueso":
				if (organosJugadoresCli[i].hueso == "") {
					organosJugadoresCli[i].hueso == "normal";
					return true;
				}
				break;
			case "corazon":
				if (organosJugadoresCli[i].corazon == "") {
					organosJugadoresCli[i].corazon == "normal";
					return true;
				}
				break;
			case "higado":
				if (organosJugadoresCli[i].higado == "") {
					organosJugadoresCli[i].higado == "normal";
					return true;
				}
				break;
			case "cerebro":
				if (organosJugadoresCli[i].cerebro == "") {
					organosJugadoresCli[i].cerebro == "normal";
					return true;
				}
				break;
			default:
				alert("OrganoNoRepetido: case organo inexistente");
			}
			return false;
		}
	}
}

function manejadorMov(posDestino, numCarta){
	var cardType = cartasUsuario[numCarta].cardType;
	var organType = cartasUsuario[numCarta].organType;
	//Descarte
	if (posDestino == 0) {
		//En realidad puedes descartar cualquier numero de cartas en una jugada->Por implementar
		nuevaCarta(numCarta);
		actualizarCanvas();
		return true;
	}

	if ((cardType == "organo") && (posDestino == 1)){
		if (organoNoRepetido(organType, posDestino)){
			var widthOrgano = posOrganosJugadores[posDestino-1][0];
			var heightOrgano = posOrganosJugadores[posDestino-1][1];
			var posOrgano = null;
			var src = cartasUsuario[numCarta].picture;
			switch (organType){
			case "cerebro":
				posOrgano = posOrganosJugadores[posDestino-1][2];
				break;
			case "corazon":
				posOrgano = posOrganosJugadores[posDestino-1][3];
				break;
			case "hueso":
				posOrgano = posOrganosJugadores[posDestino-1][4];
				break;
			case "higado":
				posOrgano = posOrganosJugadores[posDestino-1][5];
				break;
			default:
				alert("ValidarMov: cardType erroneo")
				break;
			}
			renderOrgano(widthOrgano, heightOrgano, posOrgano, src, "normal");
			//Mandamos movimiento al servidor
			nuevaCarta(numCarta);
			actualizarCanvas();
			return true;
		}
	}

	return false;
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

		asignarJugadoresAPosiciones();
		prepararOrganosJugadoresCli();
		moveObjects();
		actualizarCanvas();

	}
})


