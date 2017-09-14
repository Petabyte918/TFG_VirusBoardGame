
//
//console.log();
//console.info();
//console.warn();
//console.error();
//console.debug();
//console.clear();
/**console.groupCollapsed();
console.log("Iteracion 1..");
console.groupEnd();***/

function logF(obj){
	console.log(obj);
}

var cardType = {organo: 'organo', virus: 'virus', medicina:'medicina', tratamiento: 'tratamiento'}

function card (cardType, organType, picture){
	this.cardType = cardType;
	this.organType = organType;
	this.picture = picture;
}

card.prototype.toString = function () {
	var value = "";
	value = "Carta "+this.cardType+ " de ";
	switch (this.cardType){
		case cardType.organo: 
			value += "organo";
			break;
		case cardType.virus: 
			value += "virus";
			break;
		case cardType.medicina: 
			value += "medicina";
			break;
		case cardType.tramiento: 
			value += "tratamiento";
			break;
		case default:
			console.log("Check card.prototype.toString");
	}
	value += " "+this.organType;
	return value;
}

var deckOfCards = []
function initDeckOfCards (){
	for (var i = 0; i < 5; i++) {
		deckOfCards.push(new card(cardtype.organo, 'pulmon', 'images/organoPulmon.jpg'));
		deckOfCards.push(new card(cardtype.organo, 'corazon', 'images/organoCorazon.jpg'));
		deckOfCards.push(new card(cardtype.organo, 'higado', 'images/organoHigado.jpg'));
		deckOfCards.push(new card(cardtype.organo, 'cerebro', 'images/organoHigado.jpg'));
	}
	for (var i = 0; i < 5; i++) {
		deckOfCards.push(new card(cardtype.medicina, 'pulmon', 'images/medicinaPulmon.jpg'));
		deckOfCards.push(new card(cardtype.medicina, 'corazon', 'images/medicinaCorazon.jpg'));
		deckOfCards.push(new card(cardtype.medicina, 'higado', 'images/medicinaHigado.jpg'));
		deckOfCards.push(new card(cardtype.medicina, 'cerebro', 'images/medicinaCerebro.jpg'));
	}
	for (var i = 0; i < 4; i++) {
		deckOfCards.push(new card(cardtype.virus, 'pulmon', 'images/virusPulmon.jpg'));
		deckOfCards.push(new card(cardtype.virus, 'corazon', 'images/virusCorazon.jpg'));
		deckOfCards.push(new card(cardtype.virus, 'higado', 'images/virusHigado.jpg'));
		deckOfCards.push(new card(cardtype.virus, 'cerebro', 'images/virusCerebro.jpg'));
	}
	for (var i = 0; i < 2; i++) {
		deckOfCards.push(new card(cardtype.tratamiento, 'error medico', 'images/errorMedico.jpg'));
		deckOfCards.push(new card(cardtype.tratamiento, 'guante de latex', 'images/guanteDeLatex.jpg'));
		deckOfCards.push(new card(cardtype.tratamiento, 'transplante', 'images/transplante.jpg'));
		deckOfCards.push(new card(cardtype.tratamiento, 'ladron de organos', 'images/ladronDeOrganos.jpg'));
		deckOfCards.push(new card(cardtype.tratamiento, 'contagio', 'images/contagio.jpg'));
	}
	for (var i = 0; i < 1; i++) {
		deckOfCards.push(new card(cardtype.organo, 'comodin', 'images/organoComodin.jpg'));
		deckOfCards.push(new card(cardtype.medicina, 'comodin', 'images/medicinaComodin.jpg'));
		deckOfCards.push(new card(cardtype.virus, 'comodin', 'images/virusComodin.jpg'));
	}
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

function takeCard(){
  if (deckOfCards.length != 0){
    var drawedCard = deckOfCards.shift();
    logF(drawedCard);
    //Temp
    render(drawedCard.source,0,0);
    return drawedCard;
  }else{
    alert("Oh! No quedan cartas en el mazo!");
    return null;
  }
}

function drawCard(){
	if (Modernizr.canvas){
		var canvas = document.getElementById();
		var context = canvas.getContext("2d");
		if (context){
			var currentCard = takeCard();
			if (currentCard) {
				alert(currentCard.toString());
			}
		}
	} else {
		alert("Canvas is not supported");
	}
}



$(document.ready(function())){
	shuffleDeck();
	$("#textButton").on("click", function() {
		drawCard();
	})
}