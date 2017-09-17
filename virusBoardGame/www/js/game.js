
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

var deckOfCards = []
function initDeckOfCards (){
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

function playSound(soundResource){
	if (soundResource) {
		var currentAudio = new Audio();
		currentAudio.src = soundResource + ".wav";
		currentAudio.play();
	} else {
		console.log("Error: not soundResource");
	}
}

function renderImage(context){
	// context.drawImage(img,x,y,width,height);
	var currentImage = new Image();

	currentImage.onload = function(){
		context.drawImage(currentImage,10,10,150,200);
	}
	randomBinaryNumber = Math.floor(Math.random() * 2);

	if (randomBinaryNumber == 0){
		currentImage.src = 'img/cardImages/organoCorazon.jpg'
	} else if (randomBinaryNumber == 1){
		currentImage.src = 'img/cardImages/organoPulmon.jpg'
	} else {
		console.log(randomBinaryNumber);
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
    	console.log(drawedCard);
    	//Temp
    	//render(drawedCard.source,0,0);
    	return drawedCard;
    } else {
    	alert("Oh! No quedan cartas en el mazo!");
        return null;
    }
}

function drawCard(){
	if (Modernizr.canvas){
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
	}
}



$(document).ready(function(){
	console.log("Document Ready");
	initDeckOfCards();
	shuffleDeck(deckOfCards);
	$("#textButton").on("click", function() {
		drawCard();
	})
})