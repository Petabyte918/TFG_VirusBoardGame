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


function ponerJugadores(numJugadores, numMaquinas){
	//Queremos que todos los usuarios esten ubicados en cada dispositivo de la misma forma
	//Empezamos por el jugador propio y vamos colocando en sentido horario hasta completar el bucle
	var posUsuario = jugadores.find();
	var i = posUsuario;
	var contador = 0;
	while (contador < numJugadores) {
		posJugadores[i];

		renderBgCard(widthCarta, heightCarta, posCarta1, posCarta2, posCarta3);

		i++;
		if (i == numJugadores){
			i == 0;
		}
	}
}
