
EDICION DE IMAGENES
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
	jugadores: jugadores,				-- array
	infoJugadores: infoJugadores,		-- obj
	turno: jugadores[index],			-- str
	numTurno: numTurno,
	deckOfCardsPartida: deckOfCardsPartida,
	organosJugadoresCli: organosJugadoresCli,	-- obj
	movJugador: movJugador
};
estadoPartidas[idPartida] = newDatos_partida;

infoJugadores[jugadores[i]] = {
	turnosPerdidos: 0, 
	nombre: playersSrv[jugadores[i]].nombre,
	limiteTurnosPerdidos: 3,
	turnoPerdida: 0
}

estadoPartidas[idPartida].movJugador = {
	jugOrigen: estadoPartidas[idPartida].infoJugadores[idJugador].nombre,
	jugDestino: "",
	texto: "El jugador "+estadoPartidas[idPartida].infoJugadores[idJugador].nombre+" ha abandonado la partida",
	tipoMov: "abandonarPartida"
}

//Copia por valor y no por referencia ojo (su pm. 8 horas por)
var jugadores = shuffle(partidas[idPartida].gamePlayers.slice());

var cloneUsers = extend({}, doc);


DEBUGGING // - para no tener que escribir todo el rato
for (var jugador in estadoPartidas[idPartida].infoJugadores) {
	console.log("estadoPartidas[idPartida].infoJugadores[jugador]: "+ estadoPartidas[idPartida].infoJugadores[jugador]);
}

for (var i = 0; i < partidas[idPartida].gamePlayers.length; i++) {
	console.log("partidas[idPartida].gamePlayers[i]]6: "+partidas[idPartida].gamePlayers[i]);
}

