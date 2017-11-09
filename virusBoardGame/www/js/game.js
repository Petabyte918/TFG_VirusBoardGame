

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
var countDownSTO;
var esperarMovSTO;

function renderBGCards (){
	var widthCarta = posCartasUsuario[0];
	var heightCarta = posCartasUsuario[1];
	var posCarta1 = posCartasUsuario[2];
	var posCarta2 = posCartasUsuario[3];
	var posCarta3 = posCartasUsuario[4];

	//Imagen del fondo en BG
	var img0 = new Image();
	img0.src = "img/BG/tapete_verde-claro.jpg";
	img0.onload = function(){
		cxBG.drawImage(img0, 0, 0, windowWidth, windowHeight);
		

		//"Containers" de las diferentes cartas de usuario
		/**var img = new Image();
		img.src = "img/cardImages/reversoCarta.jpg";
		img.onload = function(){
			cxBG.drawImage(img, posCarta1[0], posCarta1[1], widthCarta, heightCarta);
			cxBG.drawImage(img, posCarta2[0], posCarta2[1], widthCarta, heightCarta);
			cxBG.drawImage(img, posCarta3[0], posCarta3[1], widthCarta, heightCarta);
		}**/

		//Imagenes de lso diferentes cubos de basura de la zona de descartes
		var widthCubo = posCubosDescarte.widthCubo;
		var heightCubo = posCubosDescarte.heightCubo;

		var cubo1 = posCubosDescarte[1];
		var img1 = new Image();
		img1.src = "img/descartesImages/cuboAmarillo.png";
		img1.onload = function(){
			cxBG.drawImage(img1, cubo1.x, cubo1.y, widthCubo, heightCubo);

			cxBG.font = "bold 50px Arial";
			cxBG.fillStyle = "rgba(60,179,113,0.1)";
			cxBG.strokeStyle = "rgba(0,0,0,0.1)";
			cxBG.fillText("Zona de descartes", ((windowWidth / 6) * 2), ((windowHeight / 2)));
			cxBG.strokeText("Zona de descartes", ((windowWidth / 6) * 2), ((windowHeight / 2)));
		}
		var cubo2 = posCubosDescarte[2];
		var img2 = new Image();
		img2.src = "img/descartesImages/cuboRojo.png"
		img2.onload = function(){
			cxBG.drawImage(img2, cubo2.x, cubo2.y, widthCubo, heightCubo);

			cxBG.font = "bold 50px Arial";
			cxBG.fillStyle = "rgba(60,179,113,0.1)";
			cxBG.strokeStyle = "rgba(0,0,0,0.1)";
			cxBG.fillText("Zona de descartes", ((windowWidth / 6) * 2), ((windowHeight / 2)));
			cxBG.strokeText("Zona de descartes", ((windowWidth / 6) * 2), ((windowHeight / 2)));
		}
		var cubo3 = posCubosDescarte[3];
		var img3 = new Image();
		img3.src = "img/descartesImages/cuboAzul.png";
		img3.onload = function(){
			cxBG.drawImage(img3, cubo3.x, cubo3.y, widthCubo, heightCubo);

			cxBG.font = "bold 50px Arial";
			cxBG.fillStyle = "rgba(60,179,113,0.1)";
			cxBG.strokeStyle = "rgba(0,0,0,0.1)";
			cxBG.fillText("Zona de descartes", ((windowWidth / 6) * 2), ((windowHeight / 2)));
			cxBG.strokeText("Zona de descartes", ((windowWidth / 6) * 2), ((windowHeight / 2)));
		}
		var cubo4 = posCubosDescarte[4];	
		var img4 = new Image();
		img4.src = "img/descartesImages/cuboVerde.png";
		img4.onload = function(){
			cxBG.drawImage(img4, cubo4.x, cubo4.y, widthCubo, heightCubo);

			cxBG.font = "bold 50px Arial";
			cxBG.fillStyle = "rgba(60,179,113,0.1)";
			cxBG.strokeStyle = "rgba(0,0,0,0.1)";
			cxBG.fillText("Zona de descartes", ((windowWidth / 6) * 2), ((windowHeight / 2)));
			cxBG.strokeText("Zona de descartes", ((windowWidth / 6) * 2), ((windowHeight / 2)));
		}

	}
}

function degToRad(degree) {
		var factor = Math.PI / 180 ;
		return degree * factor;
}

function renderCountDown(time, oldDate){
	//console.log("renderCountDown()");
	var radius = 30;
	var xCountDown = posCubosDescarte[1].x -radius;
	var yCountDown = posCubosDescarte[1].y + radius*6;

	//Cada vez que cambiemos el tiempo del cronometro hay que ajustar el valor
	//multiplicando el tiempo por (60/valorcronometro)
	var ajuste = 2;

	var now = new Date();
	var newMilliseconds = now.getTime();
	var oldMilliseconds = oldDate.getTime();

	var timeLapse = newMilliseconds - oldMilliseconds;

	time = time - (timeLapse / 1000);

	var seconds = Math.floor(time);
	if (seconds < 0){
		seconds = 0;
	}

	//Limpiamos zona particular del canvas + (pxLinea + pxDifuminado)*2
	cxMID.clearRect(xCountDown-10-radius, yCountDown-10-radius, radius*2+20, radius*2+20);

	//Fondo
	cxMID.beginPath();
	cxMID.strokeStyle = '#09303a';
	cxMID.lineWidth = 10;
	cxMID.lineCap = 'black';
	cxMID.shadowBlur = 0;
	cxMID.shadowColor = '#09303a';

	gradient = cxMID.createRadialGradient(250, 250, 5, 250, 250, 300);
	gradient.addColorStop(0, '#09303a');
	gradient.addColorStop(1, 'black');
	cxMID.fillStyle = gradient;
	cxMID.arc(xCountDown,yCountDown,radius, 0, degToRad(360),false);
	cxMID.fill();
	cxMID.stroke();

	//Arco
	cxMID.beginPath();
	cxMID.strokeStyle = '#28d1fa';
	cxMID.lineWidth = 10;
	cxMID.lineCap = 'round';
	cxMID.shadowBlur = 2;
	cxMID.shadowColor = '#28d1fa';

	cxMID.arc(xCountDown,yCountDown,radius, degToRad(270), degToRad(((time*6)*ajuste)-90),false);
	cxMID.stroke();

	//CountDown
	cxMID.beginPath();
	cxMID.font = "20px Arial Bold";
	cxMID.fillStyle = '#28d1fa';
	if (seconds < 10){
		cxMID.fillText(seconds, xCountDown - 5, yCountDown + 8);
	} else {
		cxMID.fillText(seconds, xCountDown - 10, yCountDown + 8);
	}

	countDownSTO = setTimeout(function(){ 

		if (time > 0) {
			renderCountDown(time, now);
		} else {
			movJugador = "tiempo_agotado";
			//Y nos chivamos al servidor
		}
	}, 250);
}

function indicarTurno(turno) {
	console.log("indicarTurno()-game.js");
	var numJugadores = jugadores.length;
	var index = jugadores.indexOf(turno);
	var posX, posY, widthJug, heightJug = 0;

	//Tengo el jugador veo que pos ocupa
	var posJug = posPorJugador[turno].posicion;

	//Limpiamos el canvas
	cxMID.clearRect(0, 0, windowWidth, windowHeight);

	//Dejamos 20px de margen por cada lado
	posX = posOrganosJugadores[posJug].posCerebro[0]-5-20;
	posY = posOrganosJugadores[posJug].posCerebro[1]-5-20;
	//5px del marco del turno y 20px hasta borde de la pantalla
	widthJug = (posOrganosJugadores[posJug].posComodin[0] - posOrganosJugadores[posJug].posCerebro[0]+posOrganosJugadores[posJug].widthOrgano)+5*2+20*2;
	heightJug =  (posOrganosJugadores[posJug].posComodin[1] - posOrganosJugadores[posJug].posCerebro[1]+posOrganosJugadores[posJug].heightOrgano)+5*2+20*2;
		
	switch (posJug){
	//Posicion 1
	case 1:
		posY = posY-5;
		break;
	//Posicion 2
	case 2:
		posX = posX+5;
		break;
	//Posicion 3
	case 3:
		posY = posY+5;
		break;
	//Posicion 4
	case 4:
		posY = posY+5;
		break;
	//Posicion 5
	case 5:
		posY = posY+5;
		break;
	//Posicion 6
	case 6:
		posX = posX-5;
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
	console.log("PosX: "+posX);
	console.log("PosY: "+posY);
	console.log("widthJug: "+widthJug);
	console.log("heightJug: "+heightJug);
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
			jugPorPosicion[posJugadores[contPos]]= {
				jugador: jugadores[i],
				posicion: posJugadores[contPos]
			};
			//console.log("jugPorPosicion :"+jugPorPosicion[contPos].jugador+", "+jugPorPosicion[contPos].posicion);
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
	for (var pos in jugPorPosicion){
		posPorJugador[jugPorPosicion[pos].jugador] = {
			jugador: jugPorPosicion[pos].jugador,
			posicion: jugPorPosicion[pos].posicion
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
	console.log("actualizarCanvasMID");
	var estadoOrgano, pos;
	var posOrgano = {};
	//Puedo recorrer los jugadores desde el array de jugadores o desde los indices de organosJugadoresCli
	for (var jugador in organosJugadoresCli) {
		pos = organosJugadoresCli[jugador].posicion;
		posOrgano.width = posOrganosJugadores[pos].widthOrgano;
		posOrgano.height = posOrganosJugadores[pos].heightOrgano;

		//posOrganosJug = {widthOrgano, heightOrgano, posCerebro, posCorazon, posHueso, posHigado};
		for (var elem in organosJugadoresCli[jugador]) {
			if (elem == "jugador") {
				//No me hace falta porque con jugador es como voy recorriendo el array
				//jug = organosJugadoresCli[jugador].jugador;
				//console.log("Jugador: "+jug);
				continue;
			} else if (elem == "posicion") {
				//No me hace falta porque en el objeto no hay orden y tengo que saber la pos antes
				//pos = organosJugadoresCli[jugador].posicion;
				//console.log("Posicion jugador: "+pos);
				continue;
			} else {
				//elem = corazon, cerebro etc..				
				switch (elem) {
				case "cerebro":
					posOrgano.tipo = "cerebro";
					posOrgano.x = posOrganosJugadores[pos].posCerebro[0];
					posOrgano.y = posOrganosJugadores[pos].posCerebro[1];
					posOrgano.src = 'img/cardImagesLQ/organos/orgaCerebro.png';
					break;
				case "corazon":
					posOrgano.tipo = "corazon";
					posOrgano.x = posOrganosJugadores[pos].posCorazon[0];
					posOrgano.y = posOrganosJugadores[pos].posCorazon[1];
					posOrgano.src = 'img/cardImagesLQ/organos/orgaCorazon.png';
					break;
				case "higado":
					posOrgano.tipo = "higado";
					posOrgano.x = posOrganosJugadores[pos].posHigado[0];
					posOrgano.y = posOrganosJugadores[pos].posHigado[1];
					posOrgano.src = 'img/cardImagesLQ/organos/orgaHigado.png';					
					break;
				case "hueso":
					posOrgano.tipo = "hueso";
					posOrgano.x = posOrganosJugadores[pos].posHueso[0];
					posOrgano.y = posOrganosJugadores[pos].posHueso[1];
					posOrgano.src = 'img/cardImagesLQ/organos/orgaHueso.png';					
					break;
				case "organoComodin":
					posOrgano.tipo = "organoComodin";
					posOrgano.x = posOrganosJugadores[pos].posComodin[0];
					posOrgano.y = posOrganosJugadores[pos].posComodin[1];
					posOrgano.src = 'img/cardImagesLQ/organos/orgaComodin.png';	
					break;
				default:
					console.log("Fallo en actualizarCanvasMID switch elem-opcion extraña ha aparecido");
					break;
				}

				//estadoOrgano = "", "normal" etc...
				estadoOrgano = organosJugadoresCli[jugador][elem];

				renderOrgano(posOrgano, estadoOrgano);
			}
		}
	}
}

function renderOrgano(posOrgano, estadoOrgano) {
	//console.log("Render organo-estado: "+posOrgano.tipo+"-"+estadoOrgano);
	var x = posOrgano.x;
	var y = posOrgano.y;
	var widthOrgano = posOrgano.width;
	var heightOrgano = posOrgano.height;
	var src = posOrgano.src;

	//Estado organos: vacio, normal, enfermo, vacunado, inmunizado
	//Marco negro en fondo blanco
	if (estadoOrgano == ""){
		cxMID.fillStyle = 'black';
		cxMID.fillRect(x-5, y-5, widthOrgano+10, heightOrgano+10);
		cxMID.fillStyle = 'white';
		cxMID.fillRect(x, y, widthOrgano, heightOrgano);

	}

	//Marco negro en fondo blanco y encima la imagen
	if(estadoOrgano == "normal"){
		cxMID.fillStyle = 'black';
		cxMID.fillRect(x-5, y-5, widthOrgano+10, heightOrgano+10);
		/**cxMID.fillStyle = 'white';
		cxMID.fillRect(x, y, widthOrgano, heightOrgano);**/
		var img1 = new Image();
		img1.src = src;
		img1.onload = function(){
			//console.log("objetos[0] :"+objetos[0]);
			cxMID.drawImage(img1, x, y, widthOrgano, heightOrgano);
		}
	}

	//Marco rojo en fondo blanco y encima la imagen
	if (estadoOrgano == "enfermo"){
		cxMID.fillStyle = 'red';
		cxMID.fillRect(x-5, y-5, widthOrgano+10, heightOrgano+10);
		/**cxMID.fillStyle = 'white';
		cxMID.fillRect(x, y, widthOrgano, heightOrgano);**/
		var img1 = new Image();
		img1.src = src;
		img1.onload = function(){
			//console.log("objetos[0] :"+objetos[0]);
			cxMID.drawImage(img1, x, y, widthOrgano, heightOrgano);
		}
	}

	//Marco azul en fondo blanco y encima la imagen
	if (estadoOrgano == "vacunado"){
		cxMID.fillStyle = 'blue';
		cxMID.fillRect(x-5, y-5, widthOrgano+10, heightOrgano+10);
		/**cxMID.fillStyle = 'white';
		cxMID.fillRect(x, y, widthOrgano, heightOrgano);**/
		var img1 = new Image();
		img1.src = src;
		img1.onload = function(){
			//console.log("objetos[0] :"+objetos[0]);
			cxMID.drawImage(img1, x, y, widthOrgano, heightOrgano);
		}
	}

	//Marco azul en fondo blanco, imagen y encima cuadrado azul semitransparente
	if (estadoOrgano == "inmunizado"){
		cxMID.fillStyle = 'blue';
		cxMID.fillRect(x-5, y-5, widthOrgano+10, heightOrgano+10);
		/**cxMID.fillStyle = 'white';
		cxMID.fillRect(x, y, widthOrgano, heightOrgano);**/
		var img1 = new Image();
		img1.src = src;
		img1.onload = function(){
			//console.log("objetos[0] :"+objetos[0]);
			cxMID.drawImage(img1, x, y, widthOrgano, heightOrgano);
			var img2 = new Image();
			img2.src = "img/cardImagesLQ/cadenas.png";
			img2.onload = function(){
				//console.log("objetos[0] :"+objetos[0]);
				cxMID.drawImage(img2, x-5, y-5, widthOrgano+10, heightOrgano+10);
			}
		}
		/**
		cxMID.globalAlpha = 0.2;
		cxMID.fillStyle = 'blue';
	    cxMID.fillRect(x, y, widthOrgano, heightOrgano);;
	    cxMID.globalAlpha = 1.0;
	    **/
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
		width: posCartasUsuario[0], height: posCartasUsuario[1],
		numCarta: 0,
		src: cartasUsuario[0].picture
	});
	objetos.push({
		x: posCartasUsuario[3][0], y: posCartasUsuario[3][1] + offsetCartasUsuario,
		xOrigen: posCartasUsuario[3][0], yOrigen: posCartasUsuario[3][1] + offsetCartasUsuario,
		width: posCartasUsuario[0], height: posCartasUsuario[1],
		numCarta: 1,
		src: cartasUsuario[1].picture
	});
	objetos.push({
		x: posCartasUsuario[4][0], y: posCartasUsuario[4][1] + offsetCartasUsuario,
		xOrigen: posCartasUsuario[4][0], yOrigen: posCartasUsuario[4][1] + offsetCartasUsuario,
		width: posCartasUsuario[0], height: posCartasUsuario[1],
		numCarta: 2,
		src: cartasUsuario[2].picture
	});

	//Movil - ordenador
	//cv.ontouchstart = function(event) {
		//var touch = event.touches[0];
	cv.onmousedown = function(event) {
		var touch = event;
		//console.log("Onmousedown");
		for (var i = 0; i < objetos.length; i++) {
			if (objetos[i].x < touch.pageX
			  && (objetos[i].width + objetos[i].x > touch.pageX)
			  && objetos[i].y < touch.pageY
			  && (objetos[i].height + objetos[i].y > touch.pageY)) {
				objetoActual = objetos[i];
				//console.log("Objeto "+i+" TOCADO");
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
		//console.log("Onmousemove");
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
		//console.log("Onmouseup");
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
	//Si no es mi turno aunque pueda mover los objetos no proceso nada y devuelvo los obj a su origen
	if (turno != usuario){
		objetoActual.x = objetoActual.xOrigen;
		objetoActual.y = objetoActual.yOrigen;
		return;
	}

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
		//console.log("Colision zona 1");
		colision = 1;
	}
	//Posicion 4
	else if ((objetoActual.x < ((windowWidth / 6) * 4)) &&
		(objetoActual.x > ((windowWidth / 6) * 2)) &&
		(objetoActual.y < (windowHeight / 3))) {
		//console.log("Colision zona 4");
		colision = 4;
	}
	//Posicion 2
	else if ((objetoActual.x < ((windowWidth / 6) * 1)) &&
		(objetoActual.y > (windowHeight / 3))) {
		//console.log("Colision zona 2");
		colision = 2;
	}
	//Posicion 6
	else if ((objetoActual.x > ((windowWidth / 6) * 5)) &&
		(objetoActual.y > (windowHeight / 3))) {
		//console.log("Colision zona 6");
		colision = 6;
	}
	//Posicion 3
	else if ((objetoActual.x < ((windowWidth / 6) * 2)) &&
		(objetoActual.y < (windowHeight / 3))) {
		//console.log("Colision zona 3");
		colision = 3;
	}
	//Posicion 5
	else if ((objetoActual.x > ((windowWidth / 6) * 4)) &&
		(objetoActual.y < (windowHeight / 3))) {
		//console.log("Colision zona 5");
		colision = 5;
	}
	//Posicion 0 (central = descarte)
	else if ((objetoActual.x < ((windowWidth / 6) * 5)) &&
		(objetoActual.x > ((windowWidth / 6) * 1)) &&
		(objetoActual.y > (windowHeight / 3) * 1) &&
		(objetoActual.y < (windowHeight / 3) * 2)) {
		//console.log("Colision zona 0");
		colision = 0;
	}
	//Posicion -1 - Redibujarmos otra vez
	else {
		colision = -1;
		//Cuidado porque hay dos cuadrados de los 18 que no son colision con nada
		//pero no impican movimiento invalido
		alert("Movimiento invalido");
	}

	manejadorMov(colision, objetoActual.numCarta);

	objetoActual.x = objetoActual.xOrigen;
	objetoActual.y = objetoActual.yOrigen;
}

function manejadorMov(posDestino, numCarta){
	console.log("Pos destino del movimiento: "+posDestino);

	//Descarte
	if (posDestino == 0) {
		//En realidad puedes descartar cualquier numero de cartas en una jugada->Por implementar
		//console.log("Carta descartada - Movimiento valido");
		movJugador = "algo";
		nuevaCarta(numCarta);
		//Si es un descarte no seguimos evaluando nada mas!!
		return;
	}

	//He soltado la carta en una posicion que no corresponde a ningún jugador
	if (jugPorPosicion[posDestino] == undefined) {
		console.log("jugPorPosicion[posDestino] == "+jugPorPosicion[posDestino]);
		return;
	}

	var jugDestino = jugPorPosicion[posDestino].jugador;

	var cardType = cartasUsuario[numCarta].cardType;
	var organType = cartasUsuario[numCarta].organType;

	var movValido = false;

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
				break;
			case "higado":
				if (organosJugadoresCli[jugDestino].higado == ""){
					organosJugadoresCli[jugDestino].higado = "normal";
					movValido = true;
					break;
				}
				break;
			case "comodin":
				if (organosJugadoresCli[jugDestino].orgaComodin == ""){
					organosJugadoresCli[jugDestino].orgaComodin = "normal";
					movValido = true;
					break;
				}
				break;
			default:
				console.log("Error grave en manejadorMov()-switch organo");
			}
		} else {
			console.log("Movimiento no valido");
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
			console.log("Movimiento no valido");
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
			console.log("Movimiento no valido");
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
			console.log("Movimiento no valido");
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
			console.log("Movimiento no valido");
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
			console.log("Movimiento no valido");
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
			console.log("Movimiento no valido");
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
			console.log("Movimiento no valido");
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
			console.log("Movimiento no valido");
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
		movJugador = "algo";
	} else {
		console.log("Movimiento no valido");
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


