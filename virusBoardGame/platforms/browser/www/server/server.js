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

var cartasJugadores = [];
function repartirCartas(){
	var nombreJugador = "";
	for (var i = 0; i < jugadores.length; i++){
		nombreJugador = jugadores[i];
		cartasJugadores[nombreJugador, takeCard(), takeCard(), takeCard()];
		//sendJugador sus cartas
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
}