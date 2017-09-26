
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

var usuario = ""; //Nombre de usuario
var numHumanos, numMaquinas, numJugadores = 0;
var jugadores = []; //Nombres humanos
var deckOfCards = []; //Array que contiene todas las cartas
var posJugadores = []; //Dependiendo del numero de jugadores, huecos de la mesa usaremos
var posCartasJugadores = []; //Que pintamos y donde en cada hueco
Engine = new function () {
	//Responsive canvas
	this.initializeCanvas = function(){
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
	this.initializeJugadores = function(){
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
	this.initializePosiciones = function(){
		var widthDisponible, heightDisponible = 0;
		var widthCarta, heightCarta = 0;
		var posCarta1, posCarta2, posCarta3 = 0;
		//Posiciones y tamaños estaran proporcionados con el tamaño de la pantalla

		//POSICION 1
		widthDisponible = windowWidth / 3;
		heightDisponible = windowHeight / 3;
		//20px sera la separacion entre cartas * 2 = 40
		widthCarta = widthDisponible / 3 - 20;
		//La altura de la carta va en relacion a su anchura para que no se deforme (1-1.5)
		//posCartaX = [width, height]
		heightCarta = widthCarta * 1.5;
		posCarta1 = [windowWidth / 2 - widthCarta * 1.5 - 20, windowHeight - heightCarta - 20];
		posCarta2 = [windowWidth / 2 - widthCarta * 0.5, windowHeight - heightCarta - 20];
		posCarta3 = [windowWidth / 2 + widthCarta * 0.5 + 20, windowHeight - heightCarta - 20];
		var posCartasJug1 = [widthCarta, heightCarta, posCarta1, posCarta2, posCarta3];
		posCartasJugadores.push(posCartasJug1);

		//POSICION 2
		widthDisponible = windowWidth / 3;
		heightDisponible = windowHeight / 3;
		//20px sera la separacion entre cartas * 2 = 40
		heightCarta = widthDisponible / 6 - 20;
		//La altura de la carta va en relacion a su anchura para que no se deforme (1-1.5)
		//posCartaX = [width, height]
		widthCarta = heightCarta * 1.5;
		posCarta1 = [20, windowHeight / 2 - heightCarta * 1.5 - 20];
		posCarta2 = [20, windowHeight / 2 - heightCarta * 0.5];
		posCarta3 = [20, windowHeight / 2 + heightCarta * 0.5 + 20];
		var posCartasJug2 = [widthCarta, heightCarta, posCarta1, posCarta2, posCarta3];
		posCartasJugadores.push(posCartasJug2);

		//POSICION 3
		widthDisponible = windowWidth / 3;
		//20px sera la separacion entre cartas * 2 = 40
		widthCarta = widthDisponible / 6 - 20; 
		//La altura de la carta va en relacion a su anchura para que no se deforme (1-1.5)
		//posCartaX = [width, height, rotacion]
		heightCarta = widthCarta * 1.5;
		posCarta1 = [windowWidth / 3 - widthCarta * 3 - 40, 20];
		posCarta2 = [windowWidth / 3 - widthCarta * 2 - 20, 20];
		posCarta3 = [windowWidth / 3 - widthCarta * 1, 20];
		var posCartasJug3 = [widthCarta, heightCarta, posCarta1, posCarta2, posCarta3];
		posCartasJugadores.push(posCartasJug3);		

		//POSICION 4
		widthDisponible = windowWidth / 3;
		//20px sera la separacion entre cartas * 2 = 40
		widthCarta = widthDisponible / 6 - 20; 
		//La altura de la carta va en relacion a su anchura para que no se deforme (1-1.5)
		//posCartaX = [width, height, rotacion]
		heightCarta = widthCarta * 1.5;
		posCarta1 = [windowWidth / 2 - widthCarta * 1.5 - 20, 20];
		posCarta2 = [windowWidth / 2 - widthCarta * 0.5, 20];
		posCarta3 = [windowWidth / 2 + widthCarta * 0.5 + 20, 20];
		var posCartasJug4 = [widthCarta, heightCarta, posCarta1, posCarta2, posCarta3];
		posCartasJugadores.push(posCartasJug4);

		//POSICION 5
		widthDisponible = windowWidth / 3;
		//20px sera la separacion entre cartas * 2 = 40
		widthCarta = widthDisponible / 6 - 20; 
		//La altura de la carta va en relacion a su anchura para que no se deforme (1-1.5)
		//posCartaX = [width, height, rotacion]
		heightCarta = widthCarta * 1.5;
		posCarta1 = [(windowWidth / 3) * 2, 20];
		posCarta2 = [(windowWidth / 3) * 2 + widthCarta * 1 + 20, 20];
		posCarta3 = [(windowWidth / 3) * 2 + widthCarta * 2 + 40, 20];
		var posCartasJug5 = [widthCarta, heightCarta, posCarta1, posCarta2, posCarta3];
		posCartasJugadores.push(posCartasJug5);	

		//POSICION 6
		widthDisponible = windowWidth / 3;
		heightDisponible = windowHeight / 3;
		//20px sera la separacion entre cartas * 2 = 40
		heightCarta = widthDisponible / 6 - 20;
		//La altura de la carta va en relacion a su anchura para que no se deforme (1-1.5)
		//posCartaX = [width, height]
		widthCarta = heightCarta * 1.5;
		posCarta1 = [windowWidth - widthCarta - 20, windowHeight / 2 - heightCarta * 1.5 - 20];
		posCarta2 = [windowWidth - widthCarta - 20, windowHeight / 2 - heightCarta * 0.5];
		posCarta3 = [windowWidth - widthCarta - 20, windowHeight / 2 + heightCarta * 0.5 + 20];
		var posCartasJug6 = [widthCarta, heightCarta, posCarta1, posCarta2, posCarta3];
		posCartasJugadores.push(posCartasJug6);
	}
	this.initCartasJugs = function(){

	}
	this.initDeckOfCards = function(){
		for (var i = 0; i < 5; i++) {
			deckOfCards.push(new card(cardType.organo, 'pulmon', 'img/cardImages/organoPulmon.jpg'));
			deckOfCards.push(new card(cardType.organo, 'corazon', 'img/cardImages/organoCorazon.jpg'));
			deckOfCards.push(new card(cardType.organo, 'higado', 'img/cardImages/organoHigado.jpg'));
			deckOfCards.push(new card(cardType.organo, 'cerebro', 'img/cardImages/organoCerebro.jpg'));
		}
		for (var i = 0; i < 5; i++) {
			deckOfCards.push(new card(cardType.medicina, 'pulmon', 'img/cardImages/medicinaPulmon.jpg'));
			deckOfCards.push(new card(cardType.medicina, 'corazon', 'img/cardImages/medicinaCorazon.jpg'));
			deckOfCards.push(new card(cardType.medicina, 'higado', 'img/cardImages/medicinaHigado.jpg'));
			deckOfCards.push(new card(cardType.medicina, 'cerebro', 'img/cardImages/medicinaCerebro.jpg'));
		}
		for (var i = 0; i < 4; i++) {
			deckOfCards.push(new card(cardType.virus, 'pulmon', 'img/cardImages/virusPulmon.jpg'));
			deckOfCards.push(new card(cardType.virus, 'corazon', 'img/cardImages/virusCorazon.jpg'));
			deckOfCards.push(new card(cardType.virus, 'higado', 'img/cardImages/virusHigado.jpg'));
			deckOfCards.push(new card(cardType.virus, 'cerebro', 'img/cardImages/virusCerebro.jpg'));
		}
		for (var i = 0; i < 2; i++) {
			deckOfCards.push(new card(cardType.tratamiento, 'error medico', 'img/cardImages/errorMedico.jpg'));
			deckOfCards.push(new card(cardType.tratamiento, 'guante de latex', 'img/cardImages/guanteDeLatex.jpg'));
			deckOfCards.push(new card(cardType.tratamiento, 'transplante', 'img/cardImages/transplante.jpg'));
			deckOfCards.push(new card(cardType.tratamiento, 'ladron de organos', 'img/cardImages/ladronDeOrganos.jpg'));
			deckOfCards.push(new card(cardType.tratamiento, 'contagio', 'img/cardImages/contagio.jpg'));
		}
		for (var i = 0; i < 1; i++) {
			deckOfCards.push(new card(cardType.organo, 'comodin', 'img/cardImages/organoComodin.jpg'));
			deckOfCards.push(new card(cardType.medicina, 'comodin', 'img/cardImages/medicinaComodin.jpg'));
			deckOfCards.push(new card(cardType.virus, 'comodin', 'img/cardImages/virusComodin.jpg'));
		}
	}
}

function simularDatosIniciales(){
	//Usuario logueado o usuario propio
	usuario = "lucaskhane";
	jugadores.push("lucaskhane");
	//Otros jugadores
	//jugadores.push("Jose", "pepe");
	numHumanos = 1;
	//Usuarios maquina
	jugadores.push("maquina1");
	numMaquinas = 1;
	numJugadores = jugadores.length;

	shuffle(jugadores);
}


