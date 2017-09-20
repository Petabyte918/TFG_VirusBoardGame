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


var jugadorType = {humano: 'humano', maquina: 'maquina'};
function jugador(){
	this.jugadorType = jugadorType;
}

for (var i=0; i < numJugadores; i++){
	jugadores.push(new jugador(jugadorType.humano));
}
for (var i=0; i < numMaquinas; i++){
	jugadores.push(new jugador(jugadorType.maquina));
}