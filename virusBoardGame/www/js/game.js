

function playSound(soundResource){
	if (soundResource) {
		var currentAudio = new Audio();
		currentAudio.src = soundResource + ".wav";
		currentAudio.play();
	} else {
		console.log("Error: not soundResource");
	}
}

var objetoActual, touch = null;
var posInitObjX, posInitObjY = 0;
var cx, cv = null;
var cxAPO, cvAPO = null;
var cvMID, cxMID = null;
var cvBG, cxBG = null;
var inicioX = 0, inicioY = 0;
var imgOnload = {}; //Reuso de imagenes ya cargadas una vez
var windowWidth, windowHeight = 0;
var objetos = [];
var countDownSTO;
var esperarMovSTO;
var idDoneResizing;
var reDimCanvasON = true;

function actualizarCanvasBG(){

	//Imagen del fondo en BG
	var img0 = new Image();
	img0.src = "img/BG/tapete_verde-claro.jpg";
	img0.onload = function(){
		cxBG.drawImage(img0, 0, 0, windowWidth, windowHeight);

		//Mazo de cartas y mazo de descartes
		DeckOfCards.reDimDeckOfCards();
	}
}

function degToRad(degree) {
		var factor = Math.PI / 180 ;
		return degree * factor;
}

function renderCountDown(time, oldDate, first){
	//console.log("renderCountDown()");
	//posCartasUsuario = {width, height, posCarta1 = {x,y}, posCarta2 = {x,y}, posCarta3 = {x,y}};
	var radius = 30;
	var xCountDown = posCartasUsuario.carta1.x - radius*2.2;
	var yCountDown = posCartasUsuario.carta1.y + radius*2.2;

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
	cxMID.clearRect(xCountDown-10-radius, yCountDown-10-radius +25, radius*2+20, radius*2+20);

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
	cxMID.arc(xCountDown,yCountDown + 25,radius, 0, degToRad(360),false);
	cxMID.fill();
	cxMID.stroke();

	//Arco
	cxMID.beginPath();
	cxMID.strokeStyle = '#28d1fa';
	cxMID.lineWidth = 10;
	cxMID.lineCap = 'round';
	cxMID.shadowBlur = 2;
	cxMID.shadowColor = '#28d1fa';

	cxMID.arc(xCountDown,yCountDown + 25,radius, degToRad(270), degToRad(((time*6)*ajuste)-90),false);
	cxMID.stroke();

	//CountDown
	cxMID.beginPath();
	cxMID.font = "20px Arial Bold";
	cxMID.fillStyle = '#28d1fa';
	if (seconds < 10){
		cxMID.fillText(seconds, xCountDown - 5, yCountDown + 8 + 25);
	} else {
		cxMID.fillText(seconds, xCountDown - 10, yCountDown + 8 + 25);
	}

	//Evitamos redibujar texto en cada ciclo del crono (Eliminamos difuminado, color raro...etc)
	if ((first == "first") || (reDimCanvasON == true)) {
		reDimCanvasON = false;
		
		//Numero de turno
		cxMID.font = "900 25px Arial";
		cxMID.fillStyle = 'black';
		cxMID.shadowBlur = 1;
		cxMID.shadowColor = 'white';
		cxMID.fillText("Turno "+numTurno, xCountDown - 1.5*radius, yCountDown - 25);

		//Indicamos turno con texto de nombre usuario
		//Texto independiente al que se maneja como nombre de usuario en el servidor
		//en este caso es el mismo, peor podria ser otro
		/**var turnoJug = turno;
		var pos  = posPorJugador[turno].posicion;
		cxMID.shadowColor = "YellowGreen";
		cxMID.shadowBlur = 0;
		cxMID.font = "900 20px Arial";
		cxMID.fillStyle = 'FireBrick';

		if (turnoJug.length > 8 ){
			turnoJug = "Turno de "+turnoJug.slice(0,8);
		}
		if (pos == 1) {
			turnoJug = "TÚ turno";
			cxMID.fillStyle = '#003321';
			cxMID.shadowColor = 'red';
			cxMID.fillText(turnoJug, xCountDown - 2*radius, yCountDown - 20);
		} else {
			cxMID.fillText(turnoJug, xCountDown - 2*radius - 25*2, yCountDown - 20);
		}**/

		//Vemos si avisamos que nos hemos saltado el turno alguna vez
		if (infoJugadores[usuario].turnosPerdidos > 0) {
			//Solo ponemos la advertencia el siguiente turno al que hemos pasado
			if (infoJugadores[usuario].turnoPerdida + jugadores.length >= numTurno) {
				//¡Cuidado!: Seremos expulsados
				//si perdemos el turno
				//X veces mas
				cxMID.font = "12px Arial bold";
				cxMID.fillStyle = 'red';
				cxMID.fillText("¡Cuidado!: Seremos expulsados", xCountDown - 2*radius, yCountDown - 45 + radius*3 + 14 + 25);
				cxMID.fillText("       si perdemos el turno", xCountDown - 2*radius, yCountDown - 45 + radius*3 +28 + 25);
				cxMID.font = "15px Arial Bold";
				var numVeces = infoJugadores[usuario].limiteTurnosPerdidos - infoJugadores[usuario].turnosPerdidos;
				cxMID.fillText("      "+numVeces+" veces mas", xCountDown - 2*radius, yCountDown - 45 + radius*3 + 45 + 25);
			}
		}
	}

	countDownSTO = setTimeout(function(){ 
		if (time > 0) {
			renderCountDown(time, now, "others");
		} else {
			//console.log("renderCountDown: el tiempo ha llegado a cero");
			//Y nos chivamos al servidor
			comunicarTiempoAgotado();
			//Por si se nos ha pasado el tiempo en medio de un descarte
			fin_descarte();
			//Por si se nos ha pasado el tiempo en medio de un transplante
			fin_transplante();
			movJugador = "tiempo_agotado";

		}
	}, 250);
}

//En desuso
/**function indicarTurno(turno) {
	console.log("indicarTurno(turno)");
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
	cxMID.clearRect(posX + 5, posY + 5, widthJug - 10, heightJug - 10);
}**/

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

function representarMov(movJugador) {

}

function checkCards() {
	for (var i = 0; i < objetos.length; i++) {
		if (objetos[i].src == ""){
			nuevaCarta(i);
		}
	}
}

//En el canvas mid estan los turnos y los organos de los jugadores
function actualizarCanvasMID(){
	console.log("actualizarCanvasMID()");
	//Limpiamos el canvas antes de dibujar nada
	cxMID.clearRect(0, 0, windowWidth, windowHeight);
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
					posOrgano.posJug = pos;
					posOrgano.src = 'img/cardImagesLQ/organos/orgaCerebro.png';
					break;
				case "corazon":
					posOrgano.tipo = "corazon";
					posOrgano.x = posOrganosJugadores[pos].posCorazon[0];
					posOrgano.y = posOrganosJugadores[pos].posCorazon[1];
					posOrgano.posJug = pos;
					posOrgano.src = 'img/cardImagesLQ/organos/orgaCorazon.png';
					break;
				case "higado":
					posOrgano.tipo = "higado";
					posOrgano.x = posOrganosJugadores[pos].posHigado[0];
					posOrgano.y = posOrganosJugadores[pos].posHigado[1];
					posOrgano.posJug = pos;
					posOrgano.src = 'img/cardImagesLQ/organos/orgaHigado.png';					
					break;
				case "hueso":
					posOrgano.tipo = "hueso";
					posOrgano.x = posOrganosJugadores[pos].posHueso[0];
					posOrgano.y = posOrganosJugadores[pos].posHueso[1];
					posOrgano.posJug = pos;
					posOrgano.src = 'img/cardImagesLQ/organos/orgaHueso.png';					
					break;
				case "organoComodin":
					posOrgano.tipo = "organoComodin";
					posOrgano.x = posOrganosJugadores[pos].posComodin[0];
					posOrgano.y = posOrganosJugadores[pos].posComodin[1];
					posOrgano.posJug = pos;
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
		//Escribimos el nombre del usuario
		renderUsername(pos, jugador, posOrgano.width, posOrgano.height);
	}
}

function renderPlayerBackCards(pos, ultCartaUsada) {
	//Nuestras cartas no las pintamos
	if (pos == 1) {
		return;
	}

	var width = posPlayersHandCards.widthCarta;
	var height = posPlayersHandCards.heightCarta;
	var imgSrc = posPlayersHandCards.imgSrc;

	//Borramos el hueco de las cartas y un poco mas
	//Pintamos cada carta
	imgOnload[imgSrc].onload = function() {
		for (var carta in posPlayersHandCards[pos]) {
			var posX = posPlayersHandCards[pos][carta].x;
			var posY = posPlayersHandCards[pos][carta].y;
			if (pos == 2) {
				cxAPO.save();
				cxAPO.translate(posX, posY);
				cxAPO.translate(width + 10, 0);
				cxAPO.rotate(Math.PI/2);
				cxAPO.drawImage(imgOnload[imgSrc], 0, 0, width, height); //Ojo que invertimos dimensiones
				cxAPO.restore();
			} else {
				console.log("posX: "+posX);
				console.log("posY: "+posY);
				cxAPO.drawImage(imgOnload[imgSrc], posX, posY, width, height);
			}
		}
	}

	//Señalamos la ultima carta usada por el jugador y al cabo de x tiempo, borramos la señal
	if (ultCartaUsada != "ninguna") {
		setTimeout(function(){ 
			renderUserCards(pos, "ninguna")
		}, 1500);
	}
}

function renderUsername(pos, jugador, widthOrgano, heightOrgano) {
	console.log("renderUsername()");
	console.log("pos: "+pos);
	console.log("jugador: "+jugador);

	var jugador = jugador;

	var posX;
	var posY;

	cxMID.font = "bold 22px sans-serif";
	cxMID.fillStyle = 'FireBrick';
	switch(pos) {
	case 1:
		posX = posOrganosJugadores[pos].posCerebro[0];
		posY = posOrganosJugadores[pos].posCerebro[1] - 12;
		break;
	case 2:
		posX = posOrganosJugadores[pos].posCerebro[0] + widthOrgano + 15;
		posY = posOrganosJugadores[pos].posCerebro[1];
		break;
	case 3:
		posX = posOrganosJugadores[pos].posCerebro[0];
		posY = posOrganosJugadores[pos].posCerebro[1] + heightOrgano + 25;
		break;
	case 4:
		posX = posOrganosJugadores[pos].posCerebro[0];
		posY = posOrganosJugadores[pos].posCerebro[1] + heightOrgano + 25;
		break;
	case 5:
		posX = posOrganosJugadores[pos].posCerebro[0];
		posY = posOrganosJugadores[pos].posCerebro[1] + heightOrgano + 25;
		break;
	case 6:
		console.log("renderUsername-> pos6 no programada");
		posX = -20;
		posY = -20;
		break;
	default:
		console.log("Problema escribiendo nombres de jugadores");
		break;					
	}

	if (jugador.length > 8) {
		jugador = "Jugador "+jugador.slice(0,8);
	}
	if (pos == 1) {
		jugador = "TÚ";
		cxMID.fillStyle = '#003321';
		cxMID.fillText(jugador, posX, posY);
	} else if (pos == 2) {
		cxMID.save();
		cxMID.translate(posX, posY);
		cxMID.rotate(Math.PI/2);
		cxMID.fillText(jugador, 0, 0);
		cxMID.restore();
		
	} else {
		cxMID.fillText(jugador, posX, posY);
	}
}

function renderOrgano(posOrgano, estadoOrgano) {
	//console.log("Render organo-estado: "+posOrgano.tipo+"-"+estadoOrgano);
	var x = posOrgano.x;
	var y = posOrgano.y;
	var widthOrgano = posOrgano.width;
	var heightOrgano = posOrgano.height;
	var src = posOrgano.src;
	var posJug = posOrgano.posJug;

	//Estado organos: vacio, normal, enfermo, vacunado, inmunizado
	//Marco negro en fondo blanco
	cxMID.shadowBlur = 0;
	if (estadoOrgano == ""){
		cxMID.fillStyle = 'black';
		cxMID.fillRect(x-5, y-5, widthOrgano+10, heightOrgano+10);
		cxMID.fillStyle = '#D3D3D3';
		cxMID.fillRect(x, y, widthOrgano, heightOrgano);
		var img1 = new Image();
		img1.src = src;
		//Si dibujamos en pos 2 tenemos que rotar el canvas para dibujar la imagen girada
		if (posJug == 2) {
			img1.onload = function(){
				//console.log("objetos[0] :"+objetos[0]);
				cxMID.save();
				cxMID.globalAlpha = 0.4;
				cxMID.translate(x, y);
				cxMID.translate(widthOrgano, 0);
				cxMID.rotate(Math.PI/2);
				cxMID.drawImage(img1, 0, 0, heightOrgano, widthOrgano); //Ojo que invertimos dimensiones
				cxMID.restore();
			}
		} else {
			img1.onload = function(){
				//cxMID.save();
				cxMID.globalAlpha = 0.4;
				cxMID.drawImage(img1, x, y, widthOrgano, heightOrgano);
				cxMID.globalAlpha = 1;
				//cxMID.restore();
			}
		}
	}

	//Marco negro (en fondo blanco) y encima la imagen->como va la imagen encima no es necesario el fondo blanco
	if(estadoOrgano == "normal"){
		cxMID.fillStyle = 'black';
		cxMID.fillRect(x-5, y-5, widthOrgano+10, heightOrgano+10);
		/**cxMID.fillStyle = 'white';
		cxMID.fillRect(x, y, widthOrgano, heightOrgano);**/
		var img1 = new Image();
		img1.src = src;
		//Si dibujamos en pos 2 tenemos que rotar el canvas para dibujar la imagen girada
		if (posJug == 2) {
			img1.onload = function(){
				//console.log("objetos[0] :"+objetos[0]);
				cxMID.save();
				cxMID.translate(x, y);
				cxMID.translate(widthOrgano, 0);
				cxMID.rotate(Math.PI/2);
				cxMID.drawImage(img1, 0, 0, heightOrgano, widthOrgano); //Ojo que invertimos dimensiones
				cxMID.restore();
			}
		} else {
			img1.onload = function(){
				cxMID.drawImage(img1, x, y, widthOrgano, heightOrgano);
			}
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
		//Si dibujamos en pos 2 tenemos que rotar el canvas para dibujar la imagen girada
		if (posJug == 2) {
			img1.onload = function(){
				//console.log("objetos[0] :"+objetos[0]);
				cxMID.save();
				cxMID.translate(x, y);
				cxMID.translate(widthOrgano, 0);
				cxMID.rotate(Math.PI/2);
				cxMID.drawImage(img1, 0, 0, heightOrgano, widthOrgano); //Ojo que invertimos dimensiones
				cxMID.restore();
			}
		} else {
			img1.onload = function(){
				cxMID.drawImage(img1, x, y, widthOrgano, heightOrgano);
			}
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
		//Si dibujamos en pos 2 tenemos que rotar el canvas para dibujar la imagen girada
		if (posJug == 2) {
			img1.onload = function(){
				//console.log("objetos[0] :"+objetos[0]);
				cxMID.save();
				cxMID.translate(x, y);
				cxMID.translate(widthOrgano, 0);
				cxMID.rotate(Math.PI/2);
				cxMID.drawImage(img1, 0, 0, heightOrgano, widthOrgano); //Ojo que invertimos dimensiones
				cxMID.restore();
			}
		} else {
			img1.onload = function(){
				cxMID.drawImage(img1, x, y, widthOrgano, heightOrgano);
			}
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
		//Si dibujamos en pos 2 tenemos que rotar el canvas para dibujar la imagen girada
		if (posJug == 2) {
			img1.onload = function(){
				//console.log("objetos[0] :"+objetos[0]);
				cxMID.save();
				cxMID.translate(x, y);
				cxMID.translate(widthOrgano, 0);
				cxMID.rotate(Math.PI/2);
				cxMID.drawImage(img1, 0, 0, heightOrgano, widthOrgano); //Ojo que invertimos dimensiones
				cxMID.restore();
			}
			var img2 = new Image();
			img2.src = "img/cardImagesLQ/cadenas.png";
			img2.onload = function(){
				cxMID.save();
				cxMID.translate(x, y);
				cxMID.translate(widthOrgano, 0);
				cxMID.rotate(Math.PI/2);
				cxMID.drawImage(img2, -5, -5, heightOrgano+10, widthOrgano+10);
				cxMID.restore();
			}
		} else {
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
		}
	}
}

function renderOrganosTransplante() {
	//Redimensionamos en relacion al tamaño de la carta
	var heightCard = ($(".imagenCartaIzq").css("height")).replace("px","");;
	var widthCard = (heightCard * (1013/1536)) + "px";
	//console.log("heightCard: "+heightCard);
	//console.log("widthCard: "+widthCard);

	$(".imagenCartaIzq").css("width", widthCard);
	$(".imagenCartaDcha").css("width", widthCard);
	//Compruebo para dibujar organos
	if (transplante.enProceso == true) {
		switch(transplante.organo1.organo) {
		case "corazon":
			$(".imagenCartaIzq").css("background-image", "url('img/cardImagesLQ/organos/orgaCorazon.png')");
			break;
		case "hueso":
			$(".imagenCartaIzq").css("background-image", "url('img/cardImagesLQ/organos/orgaHueso.png')");
			break;
		case "higado":
			$(".imagenCartaIzq").css("background-image", "url('img/cardImagesLQ/organos/orgaHigado.png')");
			break;
		case "cerebro":
			$(".imagenCartaIzq").css("background-image", "url('img/cardImagesLQ/organos/orgaCerebro.png')");
			break;
		default:
			$(".imagenCartaIzq").css("background-image", "");
			break;
		}
		switch(transplante.organo2.organo) {
		case "corazon":
			$(".imagenCartaDcha").css("background-image", "url('img/cardImagesLQ/organos/orgaCorazon.png')");
			break;
		case "hueso":
			$(".imagenCartaDcha").css("background-image", "url('img/cardImagesLQ/organos/orgaHueso.png')");
			break;
		case "higado":
			$(".imagenCartaDcha").css("background-image", "url('img/cardImagesLQ/organos/orgaHigado.png')");
			break;
		case "cerebro":
			$(".imagenCartaDcha").css("background-image", "url('img/cardImagesLQ/organos/orgaCerebro.png')");
			break;
		default:
			$(".imagenCartaDcha").css("background-image", "");
			break;
		}
	} else {
		$(".imagenCartaIzq").css("background-image", "");
		$(".imagenCartaDcha").css("background-image", "");				
	}
}

function removeOrgano1Transplante() {
	console.log("removeOrgano1Transplante()");
	transplante.organo1.organo = "";
	transplante.organo1.numJug = -1;
	renderOrganosTransplante();
}

function removeOrgano2Transplante(){
	console.log("removeOrgano2Transplante()");
	transplante.organo2.organo = "";
	transplante.organo2.numJug = -1;
	renderOrganosTransplante();
}

//Ideas de mejora a futuro ->
//1. Renderizar la imagen que se mueve y las otras a diferente ritmo -> DESCARTADA
//2. Detectar la colision en el canvas de las cartas pero dibujar unicamente la que se mueve en otro sola -> HECHO
//3. Tener las imagenes siempre cargadas. ->Las vamos dejando cargadas segun aparecen de momento -> HECHO Y SOLUCIONADO
//4. Posibilidad de dibujar siempre pero borrar solo cada cierta diferencia de pixeles -> Lag, DESCARTADA

function actualizarCanvasFrontal() {
	cx.clearRect(0, 0, windowWidth, windowHeight);
	if (objetoActual != null) {
		if (imgOnload[objetoActual.src] == null) {

			imgOnload[objetoActual.src] = new Image();
			imgOnload[objetoActual.src].src = objetoActual.src;
			imgOnload[objetoActual.src].onload = function(){
				//console.log("objetos[0] :"+objetos[0]);
				cx.drawImage(imgOnload[objetoActual.src], objetoActual.x, objetoActual.y, objetoActual.width, objetoActual.height);
			}
		} else {
			cx.drawImage(imgOnload[objetoActual.src], objetoActual.x, objetoActual.y, objetoActual.width, objetoActual.height);
		}
	} else {
		//console.log("Objeto actual es NULL");
		//objetoActual[objetoActual.src] == null; //Dejamos imagenes cargadas
	}
}

function actualizarCanvasAPO(){
	//console.log("actualizarCanvasAPO()");
	cxAPO.clearRect(0, 0, windowWidth, windowHeight);
	var img1 = new Image();
	if ((objetos[0].src != "") && (descartes[0] == false)){
		//Tratamos de evitar parpadeos moviendo cartas
		if (objetos[0] == objetoActual) {
			//console.log("Objeto 1 es el objeto actual");
		} else {
			img1.src = objetos[0].src;
			img1.onload = function(){
				//console.log("objetos[0].y :"+objetos[0].y);
				cxAPO.drawImage(img1, objetos[0].x, objetos[0].y, objetos[0].width, objetos[0].height);
			}
		}
	}
	var img2 = new Image();
	if ((objetos[1].src != "") && (descartes[1] == false)){
		//Tratamos de evitar parpadeos moviendo cartas
		if (objetos[1] == objetoActual) {
			//console.log("Objeto 2 es el objeto actual");
		} else {
			img2.src = objetos[1].src;
			img2.onload = function(){
				//console.log("objetos[1] :"+objetos[1]);
				cxAPO.drawImage(img2, objetos[1].x, objetos[1].y, objetos[1].width, objetos[1].height);
			}
		}
	}
	var img3 = new Image();
	if ((objetos[2].src != "") && (descartes[2] == false)){
		//Tratamos de evitar parpadeos moviendo cartas
		if (objetos[2] == objetoActual) {
			//console.log("Objeto 3 es el objeto actual");
		} else {
			img3.src = objetos[2].src;
			img3.onload = function(){
				//console.log("objetos[2] :"+objetos[2]);
				cxAPO.drawImage(img3, objetos[2].x, objetos[2].y, objetos[2].width, objetos[2].height);
			}
		}
	}

	for (var jugador in organosJugadoresCli) {
		var pos = organosJugadoresCli[jugador].posicion;
		renderPlayerBackCards(pos, "ninguna");
	}
}

function moveObjects(){
	console.log("moveObjects()");

	objetos.push({
		x: posCartasUsuario.carta1.x, y: posCartasUsuario.carta1.y,
		xOrigen: posCartasUsuario.carta1.x, yOrigen: posCartasUsuario.carta1.y,
		width: posCartasUsuario.width, height: posCartasUsuario.height,
		numCarta: 0,
		src: cartasUsuario[0].picture
	});
	objetos.push({
		x: posCartasUsuario.carta2.x, y: posCartasUsuario.carta2.y,
		xOrigen: posCartasUsuario.carta2.x, yOrigen: posCartasUsuario.carta2.y,
		width: posCartasUsuario.width, height: posCartasUsuario.height,
		numCarta: 1,
		src: cartasUsuario[1].picture
	});
	objetos.push({
		x: posCartasUsuario.carta3.x, y: posCartasUsuario.carta3.y,
		xOrigen: posCartasUsuario.carta3.x, yOrigen: posCartasUsuario.carta3.y,
		width: posCartasUsuario.width, height: posCartasUsuario.height,
		numCarta: 2,
		src: cartasUsuario[2].picture
	});

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	    console.log('Esto es un dispositivo movil');
		cv.ontouchstart = function(event) {
			touch = event.touches[0];
			//console.log("Ontouchstart");
			for (var i = 0; i < objetos.length; i++) {
				if (objetos[i].x < touch.pageX
				  && (objetos[i].width + objetos[i].x > touch.pageX)
				  && objetos[i].y < touch.pageY
				  && (objetos[i].height + objetos[i].y > touch.pageY)) {

					objetoActual = objetos[i];
					//Chequeamos cartas para divs de ayuda
					var numCarta = objetoActual.numCarta;
					abrirAyudaCartas(numCarta);

					//console.log("Objeto "+i+" TOCADO");
					inicioY = touch.pageY - objetos[i].y;
					inicioX = touch.pageX - objetos[i].x;
					//Optimizar renderizado
					posInitObjX = objetoActual.x;
					posInitObjY = objetoActual.y;
					break;
				}
			}
		}

		cv.ontouchmove = function(event) {
			touch = event.touches[0];
			//console.log("Ontouchmove");
			//Solo actualizamos si movemos y hay algun objeto seleccionado y cada cierta diferencia de pixeles
			if (objetoActual != null) {
				objetoActual.x = touch.pageX - inicioX;
				objetoActual.y = touch.pageY - inicioY;

				//Calculamos la distancia adecuado de renderizado segun diferencia de pixeles
				//Podriamos hacer un producto escalar de x e y pero...pasando!
				var distRend = 5;

				if ( (((posInitObjX - objetoActual.x) > distRend) || 
					((objetoActual.x - posInitObjX) > distRend)) ||
					(((posInitObjY - objetoActual.y) > distRend) || 
					((objetoActual.y - posInitObjY) > distRend)) ) {

					posInitObjX = objetoActual.x;
					posInitObjY = objetoActual.y;
					actualizarCanvasFrontal();
				}

				//Objeto.x: dist x hasta el inicio de la carta
				//Touch.x: punto x de la pagina donde tocas
				//InicioX: distancia desde el limite izq de la carta al punto donde tocas (FIJO al arrastrar)
				//console.log("ObjetoActual.x: "+objetoActual.x);
				//console.log("touch.pageX: "+touch.pageX);
				//console.log("inicioX :"+inicioX);
			}
		}

		cv.ontouchend = function(event) {
			//console.log("Ontouchend");
			if (objetoActual != null){
				checkCollision();
				objetoActual = null; //Ocurra lo que ocurra acabo soltando el objeto
				actualizarCanvasAPO();
				actualizarCanvasFrontal();
			}
			//	2Eliminar o no objeto
			//	3Agregarlo o no a algun sitio
			//4restablecer coordenadas iniciale
			objetoActual = null;
		}
	} else {
		console.log('Esto es un navegador de ordenador');
		cv.onmousedown = function(event) {
			touch = event;
			//console.log("Onmousedown");
			for (var i = 0; i < objetos.length; i++) {
				if (objetos[i].x < touch.pageX
				  && (objetos[i].width + objetos[i].x > touch.pageX)
				  && objetos[i].y < touch.pageY
				  && (objetos[i].height + objetos[i].y > touch.pageY)) {

					objetoActual = objetos[i];
					//Chequeamos cartas para divs de ayuda
					var numCarta = objetoActual.numCarta;
					abrirAyudaCartas(numCarta);

					//console.log("Objeto "+i+" TOCADO");
					inicioY = touch.pageY - objetos[i].y;
					inicioX = touch.pageX - objetos[i].x;
					//Optimizar renderizado
					posInitObjX = objetoActual.x;
					posInitObjY = objetoActual.y;
					break;
				}
			}
		}

		cv.onmousemove = function(event) {
			touch = event;
			//console.log("Onmousemove");
			//Solo actualizamos si movemos y hay algun objeto seleccionado y cada cierta diferencia de pixeles
			if (objetoActual != null) {
				objetoActual.x = touch.pageX - inicioX;
				objetoActual.y = touch.pageY - inicioY;

				//Calculamos la distancia adecuado de renderizado segun diferencia de pixeles
				//Podriamos hacer un producto escalar de x e y pero...pasando!
				var distRend = 5;

				if ( (((posInitObjX - objetoActual.x) > distRend) || 
					((objetoActual.x - posInitObjX) > distRend)) ||
					(((posInitObjY - objetoActual.y) > distRend) || 
					((objetoActual.y - posInitObjY) > distRend)) ) {

					posInitObjX = objetoActual.x;
					posInitObjY = objetoActual.y;
					actualizarCanvasFrontal();
				}

				//Objeto.x: dist x hasta el inicio de la carta
				//Touch.x: punto x de la pagina donde tocas
				//InicioX: distancia desde el limite izq de la carta al punto donde tocas (FIJO al arrastrar)
				//console.log("ObjetoActual.x: "+objetoActual.x);
				//console.log("touch.pageX: "+touch.pageX);
				//console.log("inicioX :"+inicioX);
			}
		}

		cv.onmouseup = function(event) {
			//console.log("Onmouseup");
			if (objetoActual != null){
				checkCollision();
				objetoActual = null; //Ocurra lo que ocurra acabo soltando el objeto
				reDimCanvas();
			}
			//	2Eliminar o no objeto
			//	3Agregarlo o no a algun sitio
			//4restablecer coordenadas iniciale
			objetoActual = null;
		}
	}
}

function actObjects() {
	console.log("actObjects()");

	objetos[0] = {
		x: posCartasUsuario.carta1.x, y: posCartasUsuario.carta1.y,
		xOrigen: posCartasUsuario.carta1.x, yOrigen: posCartasUsuario.carta1.y,
		width: posCartasUsuario.width, height: posCartasUsuario.height,
		numCarta: 0,
		src: cartasUsuario[0].picture
	};
	objetos[1] = {
		x: posCartasUsuario.carta2.x, y: posCartasUsuario.carta2.y,
		xOrigen: posCartasUsuario.carta2.x, yOrigen: posCartasUsuario.carta2.y,
		width: posCartasUsuario.width, height: posCartasUsuario.height,
		numCarta: 1,
		src: cartasUsuario[1].picture
	};
	objetos[2] = {
		x: posCartasUsuario.carta3.x, y: posCartasUsuario.carta3.y,
		xOrigen: posCartasUsuario.carta3.x, yOrigen: posCartasUsuario.carta3.y,
		width: posCartasUsuario.width, height: posCartasUsuario.height,
		numCarta: 2,
		src: cartasUsuario[2].picture
	};
}

//Devuelve el numero de la pos. donde ha habido colision, 0 si descarte o -1 si hay error
//Ahora hacemos la colision
function checkCollision() {
	//Si no es mi turno aunque pueda mover los objetos no proceso nada y devuelvo los obj a su origen
	if (turno != usuario){
		objetoActual.x = objetoActual.xOrigen;
		objetoActual.y = objetoActual.yOrigen;
		return;
	}

	//Ojo con poner 3 y 5 antes de 2 y 6 respectivamente porque ayudan a excluir a estas ultimas pues los organos se colocan
	//con respecto a a windowsHeight, anchura de organos y margenes
	var colision = -1;
	//Si la colision es en la zona donde dejamos las cartas, la contamos como -1
	//posCartasUsuario = [widthCarta, heightCarta, posCarta1, posCarta2, posCarta3];
	if ((touch.pageX < (posCartasUsuario.carta3.x + posCartasUsuario.width)) && //posCarta3.x + widthCarta
		(touch.pageX > posCartasUsuario.carta1.x) && 
		(touch.pageY < (posCartasUsuario.carta3.y + posCartasUsuario.height)) && //posCarta3.y + heightCarta
		(touch.pageY > posCartasUsuario.carta1.y)) { //posCarta2.y
		//console.log("Colision zona zona dibujo cartas usuario");
		colision = -1;
	}
	//Posicion 1
	else if ((touch.pageX < ((windowWidth / 6) * 4)) &&
		(touch.pageX > ((windowWidth / 6) * 2)) &&
		(touch.pageY > (windowHeight / 3) * 2)) {
		//console.log("Colision zona 1");
		colision = 1;
	}
	//Posicion 4
	else if ((touch.pageX < ((windowWidth / 6) * 4)) &&
		(touch.pageX > ((windowWidth / 6) * 2)) &&
		(touch.pageY < (windowHeight / 3) * 1)) {
		//console.log("Colision zona 4");
		colision = 4;
	}
	//Posicion 3
	else if ((touch.pageX < ((windowWidth / 6) * 2)) &&
		(touch.pageY < (windowHeight / 3) * 1)) {
		//console.log("Colision zona 3");
		colision = 3;
	}
	//Posicion 2 - y no ha cumplido condicion de pos3
	else if (touch.pageX < ((windowWidth / 6) * 1)) {
		//console.log("Colision zona 2");
		colision = 2;
	}
	//Posicion 5
	else if ((touch.pageX > ((windowWidth / 6) * 4)) &&
		(touch.pageY < (windowHeight / 3) * 1)) {
		//console.log("Colision zona 5");
		colision = 5;
	}
	//Posicion 6 - y no ha cumplido condicion de pos5
	else if (touch.pageX > ((windowWidth / 6) * 5)) {
		//console.log("Colision zona 6");
		colision = 6;
	}
	//Posicion 0 (central = descarte)
	/**else if ((touch.pageX < ((windowWidth / 6) * 5)) &&
		(touch.pageX > (windowWidth / 6) * 1) &&
		(touch.pageY > (windowHeight / 3) * 1) &&
		(touch.pageY < (windowHeight / 3) * 2)) {
		//console.log("Colision zona 0");
		colision = 0;
	} **/
	//Posición 0 exacta en mazo descarte
	else if  ( (touch.pageX < (DeckOfCards.descartesData.x + DeckOfCards.descartesData.width)) &&
		(touch.pageX > DeckOfCards.descartesData.x) &&
		(touch.pageY > DeckOfCards.descartesData.y) &&
		(touch.pageY < (DeckOfCards.descartesData.y + DeckOfCards.descartesData.height)) ) {
		//console.log("Colision zona 0");
		colision = 0;
	}
	//Posicion -1 - Redibujarmos otra vez
	else {
		colision = -1;
	}

	var organoColision = checkCardColision(colision);
	manejadorMov(colision, organoColision, objetoActual.numCarta);

	//Pase lo que pase siempre colocamos todo de nuevo
	touch.pageX = null;
	touch.pageY = null;
	objetoActual.x = objetoActual.xOrigen;
	objetoActual.y = objetoActual.yOrigen;
}

function checkCardColision(colision) {
	var organoColision = "";
	var posX, posY;

	//console.log("checkCardColision() - posPolision: "+colision);

	//He soltado la carta en una posicion que no corresponde a ningún jugador
	if (posOrganosJugadores[colision] == undefined) {
		return;
	}

	var widthOrgano = posOrganosJugadores[colision].widthOrgano;
	var heightOrgano = posOrganosJugadores[colision].heightOrgano;

	//Restamos 5 a cada posX-posY y a widthOrgano y heightOrgano para expresar el borde de la carta
	//Colision cerebro
	posX = posOrganosJugadores[colision].posCerebro[0];
	posY = posOrganosJugadores[colision].posCerebro[1];

	if ( (touch.pageX > (posX - 5)) &&
		(touch.pageX < (posX + widthOrgano + 5)) &&
		(touch.pageY > (posY - 5)) &&
		(touch.pageY < (posY + heightOrgano + 5)) ) {
		organoColision = "cerebro";
	}

	//Colision corazon
	posX = posOrganosJugadores[colision].posCorazon[0];
	posY = posOrganosJugadores[colision].posCorazon[1];

	if ( (touch.pageX > (posX - 5)) &&
		(touch.pageX < (posX + widthOrgano + 5)) &&
		(touch.pageY > (posY - 5)) &&
		(touch.pageY < (posY + heightOrgano + 5)) ) {
		organoColision = "corazon";
	}

	//Colision hueso
	posX = posOrganosJugadores[colision].posHueso[0];
	posY = posOrganosJugadores[colision].posHueso[1];

	if ( (touch.pageX > (posX - 5)) &&
		(touch.pageX < (posX + widthOrgano + 5)) &&
		(touch.pageY > (posY - 5)) &&
		(touch.pageY < (posY + heightOrgano + 5)) ) {
		organoColision = "hueso";
	}

	//Colision higado
	posX = posOrganosJugadores[colision].posHigado[0];
	posY = posOrganosJugadores[colision].posHigado[1];

	if ( (touch.pageX > (posX - 5)) &&
		(touch.pageX < (posX + widthOrgano + 5)) &&
		(touch.pageY > (posY - 5)) &&
		(touch.pageY < (posY + heightOrgano + 5)) ) {
		organoColision = "higado";
	}

	//Colision organoComodin
	posX = posOrganosJugadores[colision].posComodin[0];
	posY = posOrganosJugadores[colision].posComodin[1];

	if ( (touch.pageX > (posX - 5)) &&
		(touch.pageX < (posX + widthOrgano + 5)) &&
		(touch.pageY > (posY - 5)) &&
		(touch.pageY < (posY + heightOrgano + 5)) ) {
		organoColision = "organoComodin";
	}

	//console.log("Colision concreta en organo: "+organoColision);

	return organoColision;
}

function manejadorMov(posDestino, organoColision, numCarta) {
	//console.log("Pos destino del movimiento: "+posDestino);
	//console.log("numCarta-typeOf(numcarta): "+numCarta+("-")+typeof(numCarta));

	//Transplante-block. Si estamos en proceso de transplante no podemos hacer otra cosa hasta acabar
	//if (transplante.enProceso == true) {
		//console.log("Transplante en proceso");
		//return;
	//}

	//Descarte
	if (posDestino == 0) {
		finDescarte = false;
		abrirAyudaCartas("ayudaDescartes");
		descartes[numCarta] = true;
		actualizarCanvasAPO();
		$("#descartes_boton").css("visibility","visible");
	}
	//Descarte-block. Si estamos en proceso de descarte no podemos hacer otra cosa hasta acabar
	if (finDescarte == false) {
		//console.log("Descarte en proceso");
		return;
	}

	//He soltado la carta en una posicion que no corresponde a ningún jugador
	if (jugPorPosicion[posDestino] == undefined) {
		//console.log("jugPorPosicion[posDestino] == "+jugPorPosicion[posDestino]);
		return;
	}

	var jugDestino = jugPorPosicion[posDestino].jugador;

	var cardType = cartasUsuario[numCarta].cardType;
	var organType = cartasUsuario[numCarta].organType;

	//Si es un organo y la pos es la mia, evaluo si no lo tengo
	if ((cardType == "organo") && (posDestino == 1)) {
		//console.log("organosJugadoresCli[jugDestino][organType]: "+organosJugadoresCli[jugDestino][organType]);
		//console.log("jugDestino: "+jugDestino);
		//console.log("organtype: "+organType);
		if (organosJugadoresCli[jugDestino][organType] == ""){
			organosJugadoresCli[jugDestino][organType] = "normal";
			movJugador = "algo";
		} else {
			//console.log("manejadorMov() - Organo repetido");
		}
	}

	//Si el tipo de organo de la carta es igual al lugar del organo donde la he soltado evaluo
	//O si es tipo comodin evaluo en el sitio donde he soltado
	//O si donde la he soltado es el organo comodin tambien evaluo
	//organType-> tipo del organo de la carta que he jugado
	//organoColision-> tipo del organo del organo destino
	if ((organType == organoColision) || (organType == "comodin") || (organoColision == "organoComodin")) {
		if (cardType == "medicina") {
			//Estado organos: vacio, normal, enfermo, vacunado, inmunizado
			if (organosJugadoresCli[jugDestino][organoColision] == "enfermo") {
				organosJugadoresCli[jugDestino][organoColision] = "normal";
				movJugador = "algo";
			} else if (organosJugadoresCli[jugDestino][organoColision] == "normal") {
				organosJugadoresCli[jugDestino][organoColision] = "vacunado";
				movJugador = "algo";
			} else if (organosJugadoresCli[jugDestino][organoColision] == "vacunado") {
				organosJugadoresCli[jugDestino][organoColision] = "inmunizado";
				movJugador = "algo";
			} else {
				//console.log("manejadorMov() - Medicina. Organo inmunizado o no existe");
			}
		}
			
		if (cardType == "virus") {
			//Estado organos: vacio, normal, enfermo, vacunado, inmunizado
			if (organosJugadoresCli[jugDestino][organoColision] == "enfermo") {
				organosJugadoresCli[jugDestino][organoColision] = "";
				movJugador = "algo";
			} else if (organosJugadoresCli[jugDestino][organoColision] == "normal") {
				organosJugadoresCli[jugDestino][organoColision] = "enfermo";
				movJugador = "algo";
			} else if (organosJugadoresCli[jugDestino][organoColision] == "vacunado") {
				organosJugadoresCli[jugDestino][organoColision] = "normal";
				movJugador = "algo";
			} else {
				//console.log("manejadorMov() - Virus. Organo inmunizado o no existe");
			}
		}
	}

	if (cardType == "tratamiento") {
		//Estado organos: vacio, normal, enfermo, vacunado, inmunizado
		switch (organType) {
		case "errorMedico":
			console.log("manejadorMov() - Error medico");
			var auxCerebro = organosJugadoresCli[jugDestino].cerebro;
			var auxCorazon = organosJugadoresCli[jugDestino].corazon;
			var auxHigado = organosJugadoresCli[jugDestino].higado;
			var auxHueso = organosJugadoresCli[jugDestino].hueso;
			var auxOrganoComodin = organosJugadoresCli[jugDestino].organoComodin;
			organosJugadoresCli[jugDestino].cerebro = organosJugadoresCli[usuario].cerebro;
			organosJugadoresCli[jugDestino].corazon = organosJugadoresCli[usuario].corazon;
			organosJugadoresCli[jugDestino].higado = organosJugadoresCli[usuario].higado;
			organosJugadoresCli[jugDestino].hueso = organosJugadoresCli[usuario].hueso;
			organosJugadoresCli[jugDestino].organoComodin = organosJugadoresCli[usuario].organoComodin;
			organosJugadoresCli[usuario].cerebro = auxCerebro;
			organosJugadoresCli[usuario].corazon = auxCorazon;
			organosJugadoresCli[usuario].higado = auxHigado;
			organosJugadoresCli[usuario].hueso = auxHueso;
			organosJugadoresCli[usuario].organoComodin = auxOrganoComodin;

			movJugador = "algo";
			break;
		case "guanteDeLatex":
			console.log("manejadorMov() - Guante de latex");
			movJugador = "guanteDeLatex";
			break;
		case "transplante":
			console.log("manejadorMov() - Transplante");
			//Guardo el intercambio
			if (transplante.organo1.numJug == -1) {
				transplante.organo1.organo = organoColision;
				transplante.organo1.numJug = jugDestino;
				console.log("El organo para el cambio 1 es: "+organoColision);

				transplante.enProceso = true;
			} else if (transplante.organo2.numJug == -1) {
				transplante.organo2.organo = organoColision;
				transplante.organo2.numJug = jugDestino;
				console.log("El organo para el cambio 2 es: "+organoColision);
				transplante.enProceso = true;
			}
			renderOrganosTransplante();
			//Evaluo si la jugada esta completa
			if (((transplante.organo1.organo != "") && (transplante.organo1.numJug != -1)) &&
				((transplante.organo2.organo != "") && (transplante.organo2.numJug != -1))) {

				var jug1 = transplante.organo1.numJug;
				var jug2 = transplante.organo2.numJug;
				var organo1 = transplante.organo1.organo;
				var organo2 = transplante.organo2.organo;
				var estadoOrgano1 = organosJugadoresCli[jug1][organo1];
				var estadoOrgano2 = organosJugadoresCli[jug2][organo2];

				//Dos condiciones para que sea legal
				//1: que el tipo de organos sea el mismo (y distintos de "")
				if (organo1 == organo2) {
					console.log("Transplante organos iguales");
					console.log("Organo 1: "+organo1+", estado 1: "+estadoOrgano1);
					console.log("Organo 2: "+organo2+", estado 2: "+estadoOrgano2);
					organosJugadoresCli[jug1][organo1] = estadoOrgano2;
					organosJugadoresCli[jug2][organo2] = estadoOrgano1;
					movJugador = "true";
					fin_transplante();
				}
				//2: si no que los organos, para el cambio esten vacios
				else if ((organosJugadoresCli[jug1][organo2] == "")
					&& (organosJugadoresCli[jug2][organo1] == "")) {

					console.log("Transplante organos no iguales");
					console.log("Organo 1: "+organo1+", estado 1: "+estadoOrgano1);
					console.log("Organo 2: "+organo2+", estado 2: "+estadoOrgano2);
					organosJugadoresCli[jug1][organo2] = estadoOrgano2;
					organosJugadoresCli[jug2][organo1] = estadoOrgano1;
					organosJugadoresCli[jug1][organo1] = "";
					organosJugadoresCli[jug2][organo2] = "";
					movJugador = "true";
					fin_transplante();
				} else {
					console.log("El transplante no ha sido posible");
					console.log("Organo 1: "+organo1+", estado 1: "+estadoOrgano1);
					console.log("Organo 2: "+organo2+", estado 2: "+estadoOrgano2);
				}
			}
			break;
		case "ladronDeOrganos":
			console.log("manejadorMov() - Ladron de organos");
			//Si no tengo el organo destino y se puede lo robo
			if (organosJugadoresCli[usuario][organoColision] == "") {
				var estadoOrgano = organosJugadoresCli[jugDestino][organoColision];
				if ((estadoOrgano == "vacunado") ||
					(estadoOrgano == "normal") ||
					(estadoOrgano == "enfermo")) {

					organosJugadoresCli[usuario][organoColision] = estadoOrgano;
					organosJugadoresCli[jugDestino][organoColision] = "";
					movJugador = "true";
				}
			}
			break;
		case "contagio":
			//Mov valido pero de momento no hacemos nada
			console.log("Contagio");
			movJugador = "true";
			break;
		default:
			console.log("Error grave en manejadorMov()-switch tratamiento");
		}
	}
	
	if (movJugador != "") {
		//console.log("Movimiento valido");
		nuevaCarta(numCarta);
	} else {
		//console.log("Movimiento no valido");
	}
}

function fin_descarte() {
	finDescarte = true;
	$("#descartes_boton").css("visibility","hidden");
	if (descartes[0] == true) {
		nuevaCarta(0);
	}
	if (descartes[1] == true) {
		nuevaCarta(1);
	}
	if (descartes[2] == true) {
		nuevaCarta(2);
	}

	descartes[0] = false;
	descartes[1] = false;
	descartes[2] = false;
	movJugador = "algo";
	actualizarCanvasAPO();
}

function fin_transplante() {
	transplante.enProceso = false;
	transplante.organo1.organo = "";
	transplante.organo1.numJug = -1;
	transplante.organo2.organo = "";
	transplante.organo2.numJug = -1;
	renderOrganosTransplante();
}

function reDimPartidaRapida() {
	//console.log("reDimPartidaRapida()");
	var elemBotonJug = document.getElementById('boton_jugar');
	var posBotonJug = elemBotonJug.getBoundingClientRect();

	$("#cuadroPartidaRapida").css("display", "block");
	var elemPartidaRapida = document.getElementById('cuadroPartidaRapida');
	var posPartRapida = elemPartidaRapida.getBoundingClientRect();

	var posX = (Math.floor(posBotonJug.left - posPartRapida.width - 10)).toString()+"px";
	var posY = (Math.floor(posBotonJug.top)).toString()+"px";

	$("#cuadroPartidaRapida").css("left", posX);
	$("#cuadroPartidaRapida").css("top", posY);
}

function reDimRanquingList() {
	//console.log("reDimRanquingList()");
	var elemBotonJug = document.getElementById('boton_jugar');
	var posBotonJug = elemBotonJug.getBoundingClientRect();

	var widthRanquingList = (Math.floor(windowWidth - posBotonJug.right - 15))
	var widthRanquingListStr = widthRanquingList.toString() + "px";


	var elemNumPos = document.getElementById('ranquingPos');
	var posNumPos = elemNumPos.getBoundingClientRect();
	var elemUsuario = document.getElementById('ranquingUsuario');
	var posUsuario = elemUsuario.getBoundingClientRect();
	var elemPercent = document.getElementById('ranquingPercent');
	var posPercent = elemPercent.getBoundingClientRect();
	var elemWins = document.getElementById('ranquingWins');
	var posWins = elemWins.getBoundingClientRect();
	var elemTotal = document.getElementById('ranquingTotal');
	var posTotal = elemTotal.getBoundingClientRect();

	//La anchura de todas las cajas mas unos 50px de margenes
	var widthMin = posNumPos.width + posUsuario.width + posPercent.width + posWins.width + posTotal.width +65;
	var widthMinStr = widthMin.toString() + "px";
	//console.log("widthRanquingList: "+widthRanquingList);
	//console.log("widthMin: "+widthMin);

	if (widthMin > widthRanquingList) {
		//console.log("Descuadre");
		$("#ranquingList").css("width", widthMinStr);
	} else {
		//console.log("Bien");
		$("#ranquingList").css("width", widthRanquingListStr);
	}
}

function reDimContainer_instrucciones(pagina) {
	//Si redimensionamos, que le den, cerramos las instrucciones y que las habra por procedimiento normal
	if (pagina == undefined) {
		return;
	}

	var elemBotonInstrucciones = document.getElementById('instrucciones');
	var posBotonInstrucciones = elemBotonInstrucciones.getBoundingClientRect();

	var elemContainer_botones = document.getElementById('container_botones');
	var posContainer_botones = elemContainer_botones.getBoundingClientRect();

	var elemRegister = document.getElementById('register');
	var posRegister = elemRegister.getBoundingClientRect();

	//var widthContainer_intrucciones = (Math.floor(windowWidth - posContainer_botones.right - 40)).toString() + "px";
	var widthContainer_intrucciones = (Math.floor(windowWidth / 2)).toString() + "px";
	$("#container_instrucciones1").css("width", widthContainer_intrucciones);
	$("#container_instrucciones2").css("width", widthContainer_intrucciones);
	$("#container_instrucciones3").css("width", widthContainer_intrucciones);
	$("#container_instrucciones4").css("width", widthContainer_intrucciones);
	$("#container_instrucciones5").css("width", widthContainer_intrucciones);

	var leftContainer_instrucciones = (Math.floor(posBotonInstrucciones.right + 10)).toString() + "px";
	$("#container_instrucciones1").css("left", leftContainer_instrucciones);
	$("#container_instrucciones2").css("left", leftContainer_instrucciones);
	$("#container_instrucciones3").css("left", leftContainer_instrucciones);
	$("#container_instrucciones4").css("left", leftContainer_instrucciones);
	$("#container_instrucciones5").css("left", leftContainer_instrucciones);

	var bottomContainer_instrucciones = (Math.floor(windowHeight - posBotonInstrucciones.bottom)).toString() + "px"; 
	console.log("windowHeight: "+windowHeight);
	$("#container_instrucciones1").css("bottom", bottomContainer_instrucciones);
	$("#container_instrucciones2").css("bottom", bottomContainer_instrucciones);
	$("#container_instrucciones3").css("bottom", bottomContainer_instrucciones);
	$("#container_instrucciones4").css("bottom", bottomContainer_instrucciones);
	$("#container_instrucciones5").css("bottom", bottomContainer_instrucciones);

	var elemContainer_instrucciones = document.getElementById(pagina);
	var posContainer_instrucciones = elemContainer_instrucciones.getBoundingClientRect();

	if (posContainer_instrucciones.top < (posRegister.bottom + 5)) {
		var newWidth = (Math.floor(windowWidth - posBotonInstrucciones.right - 50)).toString() + "px";
		$("#"+pagina).css("width", newWidth);

		/** En el caso de necesitar un segundo ajuste..pero meh
		var elemContainer_instrucciones = document.getElementById(pagina);
		var posContainer_instrucciones = elemContainer_instrucciones.getBoundingClientRect();
		if (posContainer_instrucciones.top < (posRegister.bottom + 5)) {
			var newWidth
			var heightContainer_instrucciones = (Math.floor(posBotonInstrucciones.top - posRegister.bottom - 10)).toString() + "px"; 
			$("#container_instrucciones1").css("max-height", heightContainer_instrucciones);
			$("#container_instrucciones2").css("max-height", heightContainer_instrucciones);
			$("#container_instrucciones3").css("max-height", heightContainer_instrucciones);
			$("#container_instrucciones4").css("max-height", heightContainer_instrucciones);
			$("#container_instrucciones5").css("max-height", heightContainer_instrucciones);
		}**/
	}
}

function reDimAyudaCartaEspecial(cartaEspecial) {
	console.log("reDimAyudaCartaEspecial()");

	/**
	posOrganosJugadores[1] = {
		widthOrgano: widthOrgano,
		heightOrgano:heightOrgano,
		posCerebro: posCerebro,
		posCorazon: posCorazon,
		posHueso: posHueso,
		posHigado: posHigado,
		posComodin: posComodin
	};**/
	var marginIzqDcha = 40;
	var marginBottom = 15;
	var posXNum = Math.floor(posOrganosJugadores[1].widthOrgano + posOrganosJugadores[1].posComodin[0] + marginIzqDcha);
	var posX = (Math.floor(posOrganosJugadores[1].widthOrgano + posOrganosJugadores[1].posComodin[0] + marginIzqDcha)).toString() + "px";
	var width = (Math.floor(windowWidth - posXNum - marginIzqDcha - 10)).toString() + "px";

	var height = "auto";

	//console.log("posXNum: "+posXNum+" - posX: "+posX);
	//console.log("width: "+width);
	//console.log("height: "+height);

	$("#"+cartaEspecial).css("left", posX);
	$("#"+cartaEspecial).css("width", width);
	$("#"+cartaEspecial).css("height", height);

	var elemAyudaLadronDeOrganos = document.getElementById(cartaEspecial);
	var posAyudaLadronDeOrganos = elemAyudaLadronDeOrganos.getBoundingClientRect();

	var top = (Math.floor(windowHeight - posAyudaLadronDeOrganos.height - marginBottom));

	//Si se trata de un descarte tengo en cuenta donde he colocado el boton de fin descartes
	if (cartaEspecial == "ayudaDescartes") {
		var elemDescartesButton = document.getElementById("descartes_boton");
		var posDescartesButton = elemDescartesButton.getBoundingClientRect();
		top= Math.floor(top - (windowHeight - posDescartesButton.top - 10));
	}

	var topStr = top.toString() + "px";

	$("#"+cartaEspecial).css("top", top);
}

function reDimListaTurnos() {
	//console.log("reDimListaTurnos()");
	//Aseguramos solo mostrar en partida
	if (isEmpty(infoJugadores)) {
		return;
	}

	//redimensionamos en relacion al cronometro
	var radius = 30;
	var xCountDown = posCartasUsuario.carta1.x - radius*2.2;
	var yCountDown = posCartasUsuario.carta1.y + radius*2.2;
	
	var xMax = xCountDown - radius*2 - 20;
	var xMin = posOrganosJugadores[2].widthOrgano + posOrganosJugadores[2].posComodin[0] + 20;
	var maxWidth = xMax - xMin;
	var maxHeight = windowHeight - yCountDown - 50;

	var posXStr = (Math.floor(xMin)).toString() + "px";
	var posYStr = (Math.floor(yCountDown)).toString() + "px";
	var maxWidthStr = (Math.floor(maxWidth)).toString() + "px";
	var maxHeightStr = (Math.floor(maxHeight)).toString() + "px";

	//console.log("xMax: "+xMax);
	//console.log("xMin: "+xMin);
	//console.log("posXStr: "+ posXStr);
	//console.log("posYStr: "+posYStr);
	//console.log("widthMaxStr: "+ maxWidthStr);
	//console.log("heightMaxStr: "+maxHeightStr);
	
	$("#listaTurnos").css("left", posXStr);
	$("#listaTurnos").css("top", posYStr);
	$("#listaTurnos").css("max-width", maxWidthStr);
	$("#listaTurnos").css("max-height", maxHeightStr);

	var nombreJug = ""; 
	var textListaTurnos = "";
	for (var i = 0; i < jugadores.length; i++) {
		if (jugadores[i] == usuario) {
			nombreJug = "<b>TÚ</b>";
		} else {
			nombreJug = infoJugadores[jugadores[i]].nombre;
		}
		
		if (jugadores[i] == turno) {
			textListaTurnos += "<p class='textListaTurnosActual'><b>"+(i+1)+".- </b>"+nombreJug+"</br></p>";
		} else {
			textListaTurnos += "<p><b>"+(i+1)+".- </b>"+nombreJug+"</br></p>";
		}
		
	}
	document.getElementById("textoListaTurnos").innerHTML = textListaTurnos;

	$("#listaTurnos").css("visibility","visible");
}

function reDimReloadButton() {
	//console.log("reDimReloadButton()");
	$("#reloadButton").css("visibility","visible");
	$("#exitButton").css("visibility","visible");
}

function reDimExitButton() {
	//console.log("reDimExitButton()");
	$("#reloadButton").css("visibility","visible");
	$("#exitButton").css("visibility","visible");
}

function reDimCanvas() {
	//No tiene porque ir con doneResizing()
	windowWidth = window.innerWidth;
	windowHeight = window.innerHeight;

	//Para redibujar texto en canvas
	reDimCanvasON = true; 

	//Parte de preparar partida
	Engine.initCanvas();
	Engine.initJugadores();
	Engine.initPosOrganosJugadores();
	Engine.initPosPlayersHandCards();
	Engine.initPosCartasUsuario();
	Engine.initFinDescartesButton();
	Engine.initPauseButton();

	actualizarCanvasBG();

	actObjects();
	actualizarCanvasAPO();

	//Parte de los turnos
	actualizarCanvasMID();
	reDimCanvasON = true;
}

function doneResizing() {
	console.log("doneResizing()");
	windowWidth = window.innerWidth;
	windowHeight = window.innerHeight;

	first = true;
	
	reDimPartidaRapida();
	reDimRanquingList();
	reDimListaTurnos();
	reDimContainer_instrucciones();
	reDimReloadButton(); //Solo para hacerlos visibles
	reDimExitButton(); //Solo para hacerlos visibles

	if (idPartida != "") {
		reDimCanvas();
	}
}

$(document).ready(function(){
	console.log("Document Ready");
	console.log("Orientation before lock is: "+screen.orientation.type);
	//Da error en el navegador, pero no para la ejecucion
	screen.orientation.lock('landscape');

	window.onload = function(){
		console.log("Window onload");

		//Para no llamar a doneResizing() un millon de veces
		$(window).resize(function() {
		    clearTimeout(idDoneResizing);
		    idDoneResizing = setTimeout(doneResizing, 50);	 
		});
	}
})


