
//Informacion que se intercambia con el servidor o se pide
var usuario = "";
var idPartida = "";
var jugadores = [];
var deckOfCards = [];
var movJugador = ""; //JugadorOrigen - JugDestino - Carta

//Informacion exclusiva de cada cliente
var posJugadores = []; //Posicion que ocupara cada jugador dependiendo del num de jugadores total
var posOrganosJugadores = []; //Informacion para dibujar los organos de los jugadores
var cartasUsuario = []; //Cartas que tiene en la mano cada jugador
var posCartasUsuario = []; //Informacion para dibujar las cartas de la mano
var organosJugadoresCli = {}; //Informacion de los jugadores y sus organos
var jugPorPosicion = []; //Dada una posicion te devuelve un jugador
var posPorJugador = {}; //Dado un jugador te devuelve una posicion

function aleatorioRGBrange(inferior,superior){
	var numPosibilidades = superior - inferior;
	var aleat = Math.random() * numPosibilidades;
	aleat = Math.floor(aleat);
	return parseInt(inferior) + aleat;
}
function colorAleatorio(){
   return "rgb(" + aleatorioRGBrange(0,255) + "," + aleatorioRGBrange(0,255) + "," + aleatorioRGBrange(0,255) + ")";
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

//
function prepararOrganosJugadoresCli(){
	for (var i = 0; i < jugadores.length; i++){
		//Estados: vacio, normal, enfermo, vacunado, inmunizado
		organosJugadoresCli[jugadores[i]] = {
			jugador: jugadores[i],
			cerebro: "",
			corazon: "",
			higado: "",
			hueso: "",
			organoComodin: ""
		};
	}
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

Engine = new function () {
	//Responsive canvas
	this.initCanvas = function(){
		windowWidth = window.innerWidth;
		windowHeight = window.innerHeight;

		//Canvas principal
		cv = document.getElementById('canvas');
		cv.width = windowWidth;
		cv.height = windowHeight;
		cx = cv.getContext('2d');
		cx.fillStyle = "rgba(0,0,255,0)";
		cx.fillRect(0,0,windowWidth,windowHeight);

		//Canvas del medio
		cvMID = document.getElementById('canvasMID');
		cvMID.width = windowWidth;
		cvMID.height = windowHeight;
		cxMID = cvMID.getContext('2d');
		cxMID.fillStyle = "rgba(0,0,255,0)";
		cxMID.fillRect(0,0,windowWidth,windowHeight);

		//Canvas en background
		cvBG = document.getElementById('canvasBG');
		cvBG.width = windowWidth;
		cvBG.height = windowHeight;
		cxBG = cvBG.getContext('2d');
		cxBG.fillStyle = 'MediumSeaGreen';
		cxBG.fillRect(0,0,windowWidth,windowHeight);

		$("#container_botones").css("display", "none");
		$("#container_form_create").css("display", "none");
		$("#lista_partidas").css("display", "none");
		$("#canvas_container").css("display", "inline");
	}
	this.initJugadores = function(){
		//Servidor: Esta funcion debe pedir al servidor los jugadores

		//Y saber como colocarlos en la mesa
		//6 posiciones libres. La propia, una a la izq, tres enfrente y otra a la dcha
		var pos1, pos2, pos3, pos4, pos5, pos6 = [];
		switch(jugadores.length){
		case 2:
			posJugadores = [1, 4];
			break;
		case 3:
			posJugadores = [1, 2, 6]; //o [1, 3, 5];
			break;
		case 4:
			posJugadores = [1, 2, 4, 6];
			break;
		case 5:
			posJugadores = [1, 2, 3, 5, 6];
			break;
		case 6:
			posJugadores = [1, 2, 3, 4, 5, 6];
			break;
		default:
			alert("Posicion jugadores erroneo por numero de jugadores erroneo");
			break;
		}
	}
	this.initPosOrganosJugadores = function(){
		var widthDisponible, heightDisponible = 0;
		var widthOrgano, heightOrgano = 0;
		var posCerebro, posCorazon, posHueso, posHigado = 0;
		//Posiciones y tamaños estaran proporcionados con el tamaño de la pantalla

		//POSICION 1
		widthDisponible = windowWidth / 3;
		//La separacion entre organos sera la mitad de un organo
		widthOrgano = widthDisponible / 6 - 20; 
		//La altura de la carta va en relacion a su anchura para que no se deforme (1-1.5)
		//posCartaX = [width, height, rotacion]
		heightOrgano = widthOrgano * 1.5;
		posCerebro = [(windowWidth / 6) * 3  - widthOrgano * 2 - widthOrgano * 0.75, windowHeight - heightOrgano - 20];
		posCorazon = [(windowWidth / 6) * 3 - widthOrgano * 1 - widthOrgano * 0.25, windowHeight - heightOrgano - 20];
		posHueso = [(windowWidth / 6) * 3 + widthOrgano * 0.25, windowHeight - heightOrgano - 20];
		posHigado = [(windowWidth / 6) * 3 + widthOrgano * 1 + widthOrgano * 0.75, windowHeight - heightOrgano - 20];
		var posOrganosJug1 = [widthOrgano, heightOrgano, posCerebro, posCorazon, posHueso, posHigado];
		posOrganosJugadores.push(posOrganosJug1);

		//POSICION 2
		widthDisponible = windowWidth / 3;
		heightDisponible = windowHeight / 3;
		//20px sera la separacion entre cartas * 2 = 40
		heightOrgano = widthDisponible / 6 - 20;
		//La altura de la carta va en relacion a su anchura para que no se deforme (1-1.5)
		//posCartaX = [width, height]
		widthOrgano = heightOrgano * 1.5;
		posCerebro = [20, windowHeight / 2 - heightOrgano * 2 - heightOrgano * 0.75];
		posCorazon = [20, windowHeight / 2 - heightOrgano * 1 - heightOrgano * 0.25];
		posHueso = [20, windowHeight / 2 + heightOrgano * 0.25];
		posHigado = [20, windowHeight / 2 + heightOrgano * 1 + heightOrgano * 0.75];
		var posOrganosJug2 = [widthOrgano, heightOrgano, posCerebro, posCorazon, posHueso, posHigado];
		posOrganosJugadores.push(posOrganosJug2);

		//POSICION 3
		widthDisponible = windowWidth / 3;
		//La separacion entre organos sera la mitad de un organo
		widthOrgano = widthDisponible / 6 - 20; 
		//La altura de la carta va en relacion a su anchura para que no se deforme (1-1.5)
		//posCartaX = [width, height, rotacion]
		heightOrgano = widthOrgano * 1.5;
		posCerebro = [(windowWidth / 6) * 1  - widthOrgano * 2 - widthOrgano * 0.75, 20];
		posCorazon = [(windowWidth / 6) * 1 - widthOrgano * 1 - widthOrgano * 0.25, 20];
		posHueso = [(windowWidth / 6) * 1 + widthOrgano * 0.25, 20];
		posHigado = [(windowWidth / 6) * 1 + widthOrgano * 1 + widthOrgano * 0.75, 20];
		var posOrganosJug3 = [widthOrgano, heightOrgano, posCerebro, posCorazon, posHueso, posHigado];
		posOrganosJugadores.push(posOrganosJug3);		

		//POSICION 4
		widthDisponible = windowWidth / 3;
		//La separacion entre organos sera la mitad de un organo
		widthOrgano = widthDisponible / 6 - 20; 
		//La altura de la carta va en relacion a su anchura para que no se deforme (1-1.5)
		//posCartaX = [width, height, rotacion]
		heightOrgano = widthOrgano * 1.5;
		posCerebro = [(windowWidth / 6) * 3  - widthOrgano * 2 - widthOrgano * 0.75, 20];
		posCorazon = [(windowWidth / 6) * 3 - widthOrgano * 1 - widthOrgano * 0.25, 20];
		posHueso = [(windowWidth / 6) * 3 + widthOrgano * 0.25, 20];
		posHigado = [(windowWidth / 6) * 3 + widthOrgano * 1 + widthOrgano * 0.75, 20];
		var posOrganosJug4 = [widthOrgano, heightOrgano, posCerebro, posCorazon, posHueso, posHigado];
		posOrganosJugadores.push(posOrganosJug4);

		//POSICION 5
		widthDisponible = windowWidth / 3;
		//La separacion entre organos sera la mitad de un organo
		widthOrgano = widthDisponible / 6 - 20; 
		//La altura de la carta va en relacion a su anchura para que no se deforme (1-1.5)
		//posCartaX = [width, height, rotacion]
		heightOrgano = widthOrgano * 1.5;
		posCerebro = [(windowWidth / 6) * 5  - widthOrgano * 2 - widthOrgano * 0.75, 20];
		posCorazon = [(windowWidth / 6) * 5 - widthOrgano * 1 - widthOrgano * 0.25, 20];
		posHueso = [(windowWidth / 6) * 5 + widthOrgano * 0.25, 20];
		posHigado = [(windowWidth / 6) * 5 + widthOrgano * 1 + widthOrgano * 0.75, 20];
		var posOrganosJug5 = [widthOrgano, heightOrgano, posCerebro, posCorazon, posHueso, posHigado];
		posOrganosJugadores.push(posOrganosJug5);	

		//POSICION 6
		widthDisponible = windowWidth / 3;
		heightDisponible = windowHeight / 3;
		//20px sera la separacion entre cartas * 2 = 40
		heightOrgano = widthDisponible / 6 - 20;
		//La altura de la carta va en relacion a su anchura para que no se deforme (1-1.5)
		//posCartaX = [width, height]
		widthOrgano = heightOrgano * 1.5;
		posCerebro = [windowWidth - widthOrgano - 20, windowHeight / 2 - heightOrgano * 2 - heightOrgano * 0.75];
		posCorazon = [windowWidth - widthOrgano - 20, windowHeight / 2 - heightOrgano * 1 - heightOrgano * 0.25];
		posHueso = [windowWidth - widthOrgano - 20, windowHeight / 2 + heightOrgano * 0.25];
		posHigado = [windowWidth - widthOrgano - 20, windowHeight / 2 + heightOrgano * 1 + heightOrgano * 0.75];
		var posOrganosJug6 = [widthOrgano, heightOrgano, posCerebro, posCorazon, posHueso, posHigado];
		posOrganosJugadores.push(posOrganosJug6);
	}
	this.initPosCartasUsuario = function(){
		var widthDisponible, heightDisponible = 0;
		var widthOrgano, heightOrgano = 0;

		widthDisponible = windowWidth / 3;
		heightDisponible = windowHeight / 3;
		widthOrgano = widthDisponible / 6 - 20; 
		heightOrgano = widthOrgano * 1.5;
		//20px sera la separacion entre cartas * 2 = 40
		var widthCarta = widthDisponible / 3 - 20;
		//La altura de la carta va en relacion a su anchura para que no se deforme (1-1.5)
		//posCartaX = [width, height]
		var heightCarta = widthCarta * 1.5;
		var posCarta1 = [windowWidth / 2 - widthCarta * 1.5 - 20, windowHeight - heightCarta - heightOrgano - 40];
		var posCarta2 = [windowWidth / 2 - widthCarta * 0.5, windowHeight - heightCarta - heightOrgano - 40];
		var posCarta3 = [windowWidth / 2 + widthCarta * 0.5 + 20, windowHeight - heightCarta - heightOrgano - 40];
		posCartasUsuario = [widthCarta, heightCarta, posCarta1, posCarta2, posCarta3];

	}
	
}

