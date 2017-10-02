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
	
}
function sendCartas(carta1, carta2, carta3){
	cartasUsuario = [carta1, carta2, carta3];
}

var cartasJugadores = [];
function repartirCartas(){
	var nombreJugador = "";
	for (var i = 0; i < jugadores.length; i++){
		nombreJugador = jugadores[i];
		var carta1 = takeCard();
		var carta2 = takeCard();
		var carta3 = takeCard();
		cartasJugadores[nombreJugador, carta1, carta2, carta3];
		//sendJugador sus cartas
		if (nombreJugador = usuario){
			sendCartas(carta1, carta2, carta3);
		}
		//Activar cuenta atras ¿Ready? 3, 2 ,1 ¡Empezamos!
		//Como nota es importante ir mandando cartas de vuelta automaticamente despues de que las jueguen
		//mientras el resto de jugadores juegan. Para agilizar
	}
}

function empezarJuego() {
	simularDatosIniciales();
	shuffle(deckOfCards);
	shuffle(jugadores);
	repartirCartas();
	sendCartas();

	
}