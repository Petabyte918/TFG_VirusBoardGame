//PENDIENTE ANTES DEL MARTES
1.- DONE- Settings
2.- DONE- Ranquing
3.- DONE- Login
4.- DONE- Register
5.- DONE- Leave-unlogin (o similar)
6.- DONE- Imagenes cartas
7.- Comentarios bocadillos primera vez al menos para los tres botones principales
8.- Funcionalidad resto cartas
	Especiales:
		-Cambiar el panel de descarte a arriba por ejemplo
		-Cada vez que una carta especial es arrastrada, un cuadro de instrucciones
		aparece a la derecha del cubo. Se puede cerrar si la carta vuelve a su sitio o al final del turno
		por si solo. Y en settings se puede ajustar como ayuda débil.
		-Con un span cada vez que la carta de use mal, podemos remarcar con otro color lo que se ha incumplido
9.- DONE- Poder descartar todas las cartas
10.- DONE- Echar al jugador tras pasar tres turnos
11.- Representar movimientos
12.- Virus comodin puede ser curado por cualquier medicina
13.- Medicina comodin puede ser infectado por cualquier virus

Edicion Imagenes
1.-Mejorar nitidez
2.-Exposicion 0-25-0-50-25
3.-Suavizado 100
4.-Suavizar 0-100
5.-Cambiar tamaño 250px

FUNCIONES RENDER
renderPlayerBackCards()->En cxAPO->Pinta el reverso de las cartas de la mano de los demas jugadores

VARIABLES
-----CLIENTE-----
infojugadores = {
	turnosPerdidos: 0, 
	nombre: playersSrv[jugadores[i]].nombre,
	limiteTurnosPerdidos: 3,
	turnoPerdida: 0
}

movJugador = {
	jugOrigen: "",
	jugDestino: "",
	texto: "",
	tipoMov: ""
};

-----SERVER-----
partidas[idPartida] = {
	idPartida: idPartida, 				-- str
	gameName: gameName, 				-- str
	gameNumPlayers: gameNumPlayers, 	-- int
	gamePlayers: gamePlayers, 			-- array
	estado: "esperando"
};

var newDatos_partida = {
	idPartida: idPartida,
	jugadores: jugadores,
	infoJugadores: infoJugadores,
	turno: jugadores[index],
	numTurno: numTurno,
	deckOfCardsPartida: deckOfCardsPartida,
	organosJugadoresCli: organosJugadoresCli,
	movJugador: movJugador
};
estadoPartidas[idPartida] = newDatos_partida;

//Copia por valor y no por referencia ojo (su pm. 8 horas por)
var jugadores = shuffle(partidas[idPartida].gamePlayers.slice());

var cloneUsers = extend({}, doc);


//Debugging - para no tener que escribir todo el rato
for (var jugador in estadoPartidas[idPartida].infoJugadores) {
	console.log("estadoPartidas[idPartida].infoJugadores[jugador]: "+ estadoPartidas[idPartida].infoJugadores[jugador]);
}

for (var i = 0; i < partidas[idPartida].gamePlayers.length; i++) {
	console.log("partidas[idPartida].gamePlayers[i]]6: "+partidas[idPartida].gamePlayers[i]);
}

