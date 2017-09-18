
function aleatorioRGBrange(inferior,superior){
	numPosibilidades = superior - inferior
	aleat = Math.random() * numPosibilidades
	aleat = Math.floor(aleat)
	return parseInt(inferior) + aleat
}
function colorAleatorio(){
   return "rgb(" + aleatorioRGBrange(0,255) + "," + aleatorioRGBrange(0,255) + "," + aleatorioRGBrange(0,255) + ")";
}

var jugadorType = {humano: 'humano', maquina: 'maquina'};
function jugador(){
	this.jugadorType = jugadorType;
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

function shuffleDeck(array) {
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

var numJugadores = 0;
var numMaquians = 0;
var jugadores = []
var deckOfCards = []
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
		for (var i=0; i < numJugadores; i++){
			jugadores.push(new jugador(jugadorType.humano));
		}
		for (var i=0; i < numMaquinas; i++){
			jugadores.push(new jugador(jugadorType.maquina));
		}
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
	numJugadores = 1;
	numMaquinas = 0;
}


