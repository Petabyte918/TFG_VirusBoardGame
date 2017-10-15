
var usuario = ""; //Nombre de usuario
var numHumanos, numMaquinas, numJugadores = 0;
var jugadores = []; //Nombres
var deckOfCards = []; //Array que contiene todas las cartas
var posJugadores = []; //Dependiendo del numero de jugadores, huecos de la mesa usaremos
var posOrganosJugadores = []; //Que pintamos y donde en cada hueco
var cartasUsuario = [];
var posCartasUsuario = [];
var organosJugadoresCli = [];
var jugPorPosicion = [];

function aleatorioRGBrange(inferior,superior){
	var numPosibilidades = superior - inferior;
	var aleat = Math.random() * numPosibilidades;
	aleat = Math.floor(aleat);
	return parseInt(inferior) + aleat;
}
function colorAleatorio(){
   return "rgb(" + aleatorioRGBrange(0,255) + "," + aleatorioRGBrange(0,255) + "," + aleatorioRGBrange(0,255) + ")";
}

var cardType = {organo: 'organo', virus: 'virus', medicina:'medicina', tratamiento: 'tratamiento'}
function card (cardType, organType, picture){
	this.cardType = cardType;
	this.organType = organType;
	this.picture = picture;
}

card.prototype.toString = function () {
	var value = "";
	value += "Carta: "+this.cardType+" "+this.organType;
	return value;
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

function prepararOrganosJugadoresCli(){
	for (var i = 0; i < jugadores.length; i++){
		organosJugadoresCli.push({
			jugador: jugadores[i],
			cerebro: "",
			corazon: "",
			higado: "",
			hueso: ""
		})
	}
}



function button_play(){
	
}

function button_create(){

}

function button_list(){
	
}

Engine = new function () {
	//Responsive canvas
	this.initCanvas = function(){
		//Only purpose adapt the canvas to full screen or show a initial menu etc etc
		/**if (Modernizr.canvas){
			var canvas = document.getElementById("canvas");
			var context = canvas.getContext("2d");

			if (context){
				var currentCard = takeCard();
				if (currentCard) {
					alert(currentCard.toString());
				}
				renderImage(context);
			}
		} else {
			alert("Canvas is not supported");
		}**/
	}
	this.initJugadores = function(){
		//Servidor: Esta funcion debe pedir al servidor los jugadores

		//Y saber como colocarlos en la mesa
		//6 posiciones libres. La propia, una a la izq, tres enfrente y otra a la dcha
		var pos1, pos2, pos3, pos4, pos5, pos6 = [];
		switch(numJugadores){
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
	this.initDeckOfCards = function(){
		for (var i = 0; i < 5; i++) {
			deckOfCards.push(new card(cardType.organo, 'hueso', 'img/orgaImages/organoHuesoSF.png'));
			deckOfCards.push(new card(cardType.organo, 'corazon', 'img/orgaImages/organoCorazonSF.png'));
			deckOfCards.push(new card(cardType.organo, 'higado', 'img/orgaImages/organoHigadoSF.png'));
			deckOfCards.push(new card(cardType.organo, 'cerebro', 'img/orgaImages/organoCerebroSF.png'));
		}
		for (var i = 0; i < 5; i++) {
			deckOfCards.push(new card(cardType.medicina, 'hueso', 'img/medImages/medHuesoSF.png'));
			deckOfCards.push(new card(cardType.medicina, 'corazon', 'img/medImages/medCorazonSF.png'));
			deckOfCards.push(new card(cardType.medicina, 'higado', 'img/medImages/medHigadoSF.png'));
			deckOfCards.push(new card(cardType.medicina, 'cerebro', 'img/medImages/medCerebroSF.png'));
		}
		for (var i = 0; i < 4; i++) {
			deckOfCards.push(new card(cardType.virus, 'hueso', 'img/virusImages/virusHuesoSF.png'));
			deckOfCards.push(new card(cardType.virus, 'corazon', 'img/virusImages/virusCorazonSF.png'));
			deckOfCards.push(new card(cardType.virus, 'higado', 'img/virusImages/virusHigadoSF.png'));
			deckOfCards.push(new card(cardType.virus, 'cerebro', 'img/virusImages/virusCerebroSF.png'));
		}
		for (var i = 0; i < 2; i++) {
			deckOfCards.push(new card(cardType.tratamiento, 'error medico', 'img/cardImages/otro.png'));
			deckOfCards.push(new card(cardType.tratamiento, 'guante de latex', 'img/cardImages/otro.png'));
			deckOfCards.push(new card(cardType.tratamiento, 'transplante', 'img/cardImages/otro.png'));
			deckOfCards.push(new card(cardType.tratamiento, 'ladron de organos', 'img/cardImages/otro.png'));
			deckOfCards.push(new card(cardType.tratamiento, 'contagio', 'img/cardImages/otro.png'));
		}
		for (var i = 0; i < 1; i++) {
			deckOfCards.push(new card(cardType.organo, 'comodin', 'img/cardImages/otro.png'));
			deckOfCards.push(new card(cardType.medicina, 'comodin', 'img/medImages/medComodinSF.png'));
			deckOfCards.push(new card(cardType.virus, 'comodin', 'img/cardImages/otro.png'));
		}
	}
}



