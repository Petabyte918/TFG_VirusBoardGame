

function playSound(soundResource){
	if (soundResource) {
		var currentAudio = new Audio();
		currentAudio.src = soundResource + ".wav";
		currentAudio.play();
	} else {
		console.log("Error: not soundResource");
	}
}

var cv, cx, objetoActual = null;
var cvMID, cxMID = null;
var cvBG, cxBG = null;
var inicioX = 0, inicioY = 0;
var windowWidth, windowHeight = 0;
var objetos = [];

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

function indicarTurno(turno) {
	var numJugadores = jugadores.length;
	var index = jugadores.indexOf(turno);
	var posX, posY, widthJug, heightJug = 0;

	//Tengo el jugador veo que pos ocupa
	var posJug = posPorJugador[turno].posicion;

	//Limpiamos el canvas
	cxMID.clearRect(0, 0, windowWidth, windowHeight);

	switch (posJug){
	//Posicion 1
	case 1:
		posX = (windowWidth / 6) * 1;
		posY = (windowHeight / 3) * 1;
		widthJug = (windowWidth / 6) * 4;
		heightJug =  (windowHeight / 3) * 2;
		break;
	//Posicion 2
	case 2:
		posX = 0;
		posY = (windowHeight / 3) * 1;
		widthJug = (windowWidth / 6) * 1;
		heightJug =  (windowHeight / 3) * 2;
		break;
	//Posicion 3
	case 3:
		posX = 0;
		posY = 0;
		widthJug = (windowWidth / 6) * 2;
		heightJug =  (windowHeight / 3) * 1;
		break;
	//Posicion 4
	case 4:
		posX = (windowWidth / 6) * 2;
		posY = 0;
		widthJug = (windowWidth / 6) * 2;
		heightJug =  (windowHeight / 3) * 1;
		break;
	//Posicion 5
	case 5:
		posX = (windowWidth / 6) * 4;
		posY = 0;
		widthJug = (windowWidth / 6) * 2;
		heightJug =  (windowHeight / 3) * 1;
		break;
	//Posicion 6
	case 6:
		posX = (windowWidth / 6) * 5;
		posY = (windowHeight / 3) * 1;
		widthJug = (windowWidth / 6) * 1;
		heightJug =  (windowHeight / 3) * 2;
		break;
	default:
		console.log("Error grave representando los turnos de los jugadores");
	}

	//Creamos un marco para indica el turno de cada jugador
	var gradient = cxMID.createRadialGradient(90,63,30,90,63,90);
	gradient.addColorStop(0, '#FFD700');
	gradient.addColorStop(1, '#DAA520');

	cxMID.fillStyle = gradient;
	cxMID.fillRect(posX, posY, widthJug, heightJug);

	//Creamos el marco de 20 px de grosor
	cxMID.clearRect(posX + 5, posY + 5, widthJug - 10, heightJug - 10);

	actualizarCanvasMID();
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

function asignarPosicionesAJugadores(){
	for (var i = 0; i < jugPorPosicion.length; i++){
		posPorJugador[jugPorPosicion[i].jugador] = {
			jugador: jugPorPosicion[i].jugador,
			posicion: jugPorPosicion[i].posicion
		}
	}
}

function nuevaCarta(numCarta){
	var newCard = takeCard();
	//console.log("Nueva carta: "+newCard.toString());
	cartasUsuario[numCarta] = newCard;
	objetos[numCarta].src = newCard.picture;
}

//En el canvas mid estan los turnos y los organos de los jugadores
function actualizarCanvasMID(){
	var widthOrgano, heightOrgano = null;
	var posOrgano = null;

	//Estado organos: vacio, normal, enfermo, vacunado, inmunizado
	for (var jugador in organosJugadoresCli) {
		var pos = organosJugadoresCli[jugador].posicion;

		//posOrganosJug = {widthOrgano, heightOrgano, posCerebro, posCorazon, posHueso, posHigado};
		for (var elem in organosJugadoresCli[pos]) {
			if (elem == "widthOrgano") {
				widthOrgano = posOrganosJugadores[pos].widthOrgano;
				continue;
			}
			if (elem == "heightOrgano") {
				heightOrgano = posOrganosJugadores[pos].heightOrgano;
				continue;
			}

			posOrgano = organosJugadoresCli[pos][elem];
			switch (organosJugadoresCli[pos][elem]) {
			case "":
				console.log("Organo vacio");
				break;
			case "normal":
				console.log("Organo normal");
				break;
			case "enfermo":
				console.log("Organo enfermo");
				break;
			case "vacunado":
				console.log("Organo vacunado");
				break;
			case "inmunizado":
				console.log("Organo inmunizado");
				break;
			default:
				console.log("Fallo en actualizarCanvasMID cerebro");
				break;
			}
		}


/**
				cxBG.fillStyle = 'white';
			cxBG.fillRect(posOrgano[0], posOrgano[1], widthOrgano, heightOrgano);
		
		organosJugadoresCli[jugadores[i]] = {
			jugador: jugadores[i],
			cerebro: "",
			corazon: "",
			higado: "",
			hueso: "",
			organoComodin: ""
		};**/
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
			objetoActual = null; //Ocurra lo que ocurra acabo soltando el objeto
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

function manejadorMov(posDestino, numCarta){


	var jugDestino = jugPorPosicion[posDestino];

	var cardType = cartasUsuario[numCarta].cardType;
	var organType = cartasUsuario[numCarta].organType;

	//Descarte
	if (posDestino == 0) {
		//En realidad puedes descartar cualquier numero de cartas en una jugada->Por implementar
		console.log("Carta descartada - Movimiento valido");
		movValido = true;
		nuevaCarta(numCarta);
		//movJugador = "algo";
		//Si es un descarte no seguimos evaluando nada mas!!
		return;
	}

	if (organosJugadoresCli[jugDestino] == undefined){
		//El jugador no esta presente sin más
		return;
	}

	if (cardType == "organo") {
		if (posDestino == 1){
			switch (organType) {
			case "cerebro":
				if (organosJugadoresCli[jugDestino].cerebro == ""){
					organosJugadoresCli[jugDestino].cerebro = "normal";
					movValido = true;
					break;
				}
			case "corazon":
				if (organosJugadoresCli[jugDestino].corazon == ""){
					organosJugadoresCli[jugDestino].corazon = "normal";
					movValido = true;
					break;
				}
			case "hueso":
				if (organosJugadoresCli[jugDestino].hueso == ""){
					organosJugadoresCli[jugDestino].hueso = "normal";
					movValido = true;
					break;
				}
				alert("Movimiento no valido");
				break;
			case "higado":
				if (organosJugadoresCli[jugDestino].higado == ""){
					organosJugadoresCli[jugDestino].higado = "normal";
					movValido = true;
					break;
				}
				alert("Movimiento no valido");
				break;
			case "comodin":
				//Mov valido pero de momento no hacemos nada
				console.log("Comodin organo");
				movValido = true;
				break;
			default:
				console.log("Error grave en manejadorMov()-switch organo");
			}
		} else {
			alert("Movimiento no valido");
		}
	}

	if (cardType == "medicina") {
		//Estado organos: vacio, normal, enfermo, vacunado, inmunizado
		switch (organType) {
		case "cerebro":
			if (organosJugadoresCli[jugDestino].cerebro == "enfermo"){
				organosJugadoresCli[jugDestino].cerebro = "normal";
				movValido = true;
				break;
			}
			if (organosJugadoresCli[jugDestino].cerebro == "normal"){
				organosJugadoresCli[jugDestino].cerebro = "vacunado";
				movValido = true;
				break;
			}
			if (organosJugadoresCli[jugDestino].cerebro == "vacunado"){
				organosJugadoresCli[jugDestino].cerebro = "inmunizado";
				movValido = true;
				break;
			}
			alert("Movimiento no valido");
			break;
		case "corazon":
			if (organosJugadoresCli[jugDestino].corazon == "enfermo"){
				organosJugadoresCli[jugDestino].corazon = "normal";
				movValido = true;
				break;
			}
			if (organosJugadoresCli[jugDestino].corazon == "normal"){
				organosJugadoresCli[jugDestino].corazon = "vacunado";
				movValido = true;
				break;
			}
			if (organosJugadoresCli[jugDestino].corazon == "vacunado"){
				organosJugadoresCli[jugDestino].corazon = "inmunizado";
				movValido = true;
				break;
			}
			alert("Movimiento no valido");
			break;
		case "hueso":
			if (organosJugadoresCli[jugDestino].hueso == "enfermo"){
				organosJugadoresCli[jugDestino].hueso = "normal";
				movValido = true;
				break;
			}
			if (organosJugadoresCli[jugDestino].hueso == "normal"){
				organosJugadoresCli[jugDestino].hueso = "vacunado";
				movValido = true;
				break;
			}
			if (organosJugadoresCli[jugDestino].hueso == "vacunado"){
				organosJugadoresCli[jugDestino].hueso = "inmunizado";
				movValido = true;
				break;
			}
			alert("Movimiento no valido");
			break;
		case "higado":
			if (organosJugadoresCli[jugDestino].higado == "enfermo"){
				organosJugadoresCli[jugDestino].higado = "normal";
				movValido = true;
				break;
			}
			if (organosJugadoresCli[jugDestino].higado == "normal"){
				organosJugadoresCli[jugDestino].higado = "vacunado";
				movValido = true;
				break;
			}
			if (organosJugadoresCli[jugDestino].higado == "vacunado"){
				organosJugadoresCli[jugDestino].higado = "inmunizado";
				movValido = true;
				break;
			}
			alert("Movimiento no valido");
			break;
		case "comodin":
			//Mov valido pero de momento no hacemos nada
			console.log("Comodin medicina");
			movValido = true;
			break;
		default:
			console.log("Error grave en manejadorMov()-switch medicina");
		}		
	}

	if (cardType == "virus") {
		//Estado organos: vacio, normal, enfermo, vacunado, inmunizado
		switch (organType) {
		case "cerebro":
			if (organosJugadoresCli[jugDestino].cerebro == "enfermo"){
				organosJugadoresCli[jugDestino].cerebro = "";
				movValido = true;
				break;
			}
			if (organosJugadoresCli[jugDestino].cerebro == "normal"){
				organosJugadoresCli[jugDestino].cerebro = "enfermo";
				movValido = true;
				break;
			}
			if (organosJugadoresCli[jugDestino].cerebro == "vacunado"){
				organosJugadoresCli[jugDestino].cerebro = "normal";
				movValido = true;
				break;
			}
			alert("Movimiento no valido");
			break;
		case "corazon":
			if (organosJugadoresCli[jugDestino].corazon == "enfermo"){
				organosJugadoresCli[jugDestino].corazon = "";
				movValido = true;
				break;
			}
			if (organosJugadoresCli[jugDestino].corazon == "normal"){
				organosJugadoresCli[jugDestino].corazon = "enfermo";
				movValido = true;
				break;
			}
			if (organosJugadoresCli[jugDestino].corazon == "vacunado"){
				organosJugadoresCli[jugDestino].corazon = "normal";
				movValido = true;
				break;
			}
			alert("Movimiento no valido");
			break;
		case "hueso":
			if (organosJugadoresCli[jugDestino].hueso == "enfermo"){
				organosJugadoresCli[jugDestino].hueso = "";
				movValido = true;
				break;
			}
			if (organosJugadoresCli[jugDestino].hueso == "normal"){
				organosJugadoresCli[jugDestino].hueso = "enfermo";
				movValido = true;
				break;
			}
			if (organosJugadoresCli[jugDestino].hueso == "vacunado"){
				organosJugadoresCli[jugDestino].hueso = "normal";
				movValido = true;
				break;
			}
			alert("Movimiento no valido");
			break;
		case "higado":
			if (organosJugadoresCli[jugDestino].higado == "enfermo"){
				organosJugadoresCli[jugDestino].higado = "";
				movValido = true;
				break;
			}
			if (organosJugadoresCli[jugDestino].higado == "normal"){
				organosJugadoresCli[jugDestino].higado = "enfermo";
				movValido = true;
				break;
			}
			if (organosJugadoresCli[jugDestino].higado == "vacunado"){
				organosJugadoresCli[jugDestino].higado = "normal";
				movValido = true;
				break;
			}
			alert("Movimiento no valido");
			break;
		case "comodin":
			//Mov valido pero de momento no hacemos nada
			console.log("Comodin virus");
			movValido = true;
			break;
		default:
			console.log("Error grave en manejadorMov()-switch virus");
		}
	}

	if (cardType == "tratamiento") {
		//Estado organos: vacio, normal, enfermo, vacunado, inmunizado
		switch (organType) {
		case "error medico":
			//Mov valido pero de momento no hacemos nada
			console.log("Error medico");
			movValido = true;
			break;
		case "guante de latex":
			//Mov valido pero de momento no hacemos nada
			console.log("Guante de latex");
			movValido = true;
			break;
		case "transplante":
			//Mov valido pero de momento no hacemos nada
			console.log("Transplante");
			movValido = true;
			break;
		case "ladron de organos":
			//Mov valido pero de momento no hacemos nada
			console.log("Ladron de organos");
			movValido = true;
			break;
		case "contagio":
			//Mov valido pero de momento no hacemos nada
			console.log("Contagio");
			movValido = true;
			break;
		default:
			console.log("Error grave en manejadorMov()-switch tratamiento");
		}
	}
	
	if (movValido) {
		console.log("Movimiento valido");
		nuevaCarta(numCarta);
		movValido = "algo";
	} else {
		alert("Movimiento no valido");
	}
	
}

$(document).ready(function(){
	console.log("Document Ready");
	console.log("Orientation before lock is: "+screen.orientation.type);
	//Da error en el navegador, pero no para la ejecucion
	screen.orientation.lock('landscape');

	window.onload = function(){
		console.log("Window onload");
	}
})


