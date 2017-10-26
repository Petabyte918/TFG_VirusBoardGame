//FUNCIONALIDAD CLIENTE

var lista_partidas = {};
var idPartidaEsperando = "";
var enPartidaEsperando = false;
/** Establecimiento de la conexion con el servidor **/
//var socket = io.connect('https://nodejs-server-virusgame.herokuapp.com/');
//Local
var socket = io.connect('localhost:8080');
socket.on('Connection OK', function (data) {
   	console.log("Cliente conectado. Player_id: "+data.player_id);
   	usuario = data.player_id;
});
/** -------------------- **/


/** Los tres botones iniciales y el boton volver a inicio**/
function button_play() {
	//Esta funcion te debe meter en la partida al azar que menos jugadores le falten
	//o en una partida sin mas cualquiera
}

function button_create() {
	console.log("button_create()");
	$("#container_botones").css("display", "none");
	$("#container_form_create").css("display", "inline");
	$("#lista_partidas").css("display", "none");
	$("#canvas_container").css("display", "none");
}

function button_lista_partidas() {
	console.log("button_lista_partidas()");
	$("#container_botones").css("display", "none");
	$("#container_form_create").css("display", "none");
	actualizar_partidas();
	$("#lista_partidas").css("display", "inline");
	$("#canvas_container").css("display", "none");
}

function backTo_InitMenu() {
	console.log("backTo_InitMenu()");
	$("#container_botones").css("display", "inline");
	$("#container_form_create").css("display", "none");
	$("#lista_partidas").css("display", "none");
	$("#canvas_container").css("display", "none");
}
/** -------------------- **/

/** Interaccion con el servidor de los tres botones iniciales **/
function form_createGame() {
	console.log("form_createGame()");
	var gameName = document.form_create_game.gameName.value;
	var gameNumPlayers = document.form_create_game.gameNumPlayers.value;
	console.log("gameName: "+gameName);
	console.log("gameNumPlayers: "+gameNumPlayers);
	 if (gameName == "") {
	 	gameName = "Juego de: "+usuario.substr(0,6);
	 }

	socket.emit('create_game', 
		{creador: usuario, gameName: gameName, gameNumPlayers: gameNumPlayers});
	//Pantalla de lista de espera
	return false;
}

socket.on('create_game-OK', function(data){
	console.log("Recibido: create_game-OK");
	idPartidaEsperando = data.idPartida;
	enPartidaEsperando = true;
	button_lista_partidas();
})

socket.on('create_game-KO', function(){
	console.log("Recibido: create game-KO");
	alert("Ya has creado o ya estas dentro de alguna partida");
	button_lista_partidas();
})

function actualizar_partidas(){
	console.log("function actualizar_partidas()");
	socket.emit('actualizar_partidas');
}

socket.on('actualizar_partidas', function(data){
	console.log("Recibido: actualizar_partidas");
	lista_partidas = data;
	actualizar_listaPartidas();
})

function actualizar_listaPartidas() {
	console.log("function actualizar_listaPartidas()");
	//Eliminamos primero los eventos asociados a los nodos hijos pues remove/empty no lo hace
	//y en un mal escenario puedes tener millones de eventos disparandose cada vez
	/** Hasta los huevos. Dia perdido. Retomar esta mierda algun dia
	('#container_partidas *').unbind();
	$('#container_partidas *').unbind('click');
	$('#container_partidas *').attr('onClick','');
	$('#container_partidas *').attr('onclick','');
	$('.partida').unbind();
	$('.partida').unbind('click');
	$('.partida').attr('onClick','');
	$('.partida').attr('onclick','');**/
	
	$("#container_partidas").empty();
	for (var id in lista_partidas) {
		if (enPartidaEsperando == false){
			//Si no estoy en partida y la sala esta llena, me la salto
			if (lista_partidas[id].gamePlayers.length >= lista_partidas[id].gameNumPlayers) {
				continue;
			}
			$("#container_partidas").append(
				'<li class=partida onclick=joinPartida("'+lista_partidas[id].idPartida+'")>'+
					'<a class=nombre_partida>Nombre partida: '+lista_partidas[id].gameName+'</a>'+
					'<a class=idPartida>'+lista_partidas[id].idPartida+'</a>'+
					'<a class=num_jugadores>'+lista_partidas[id].gamePlayers.length+'/'+lista_partidas[id].gameNumPlayers+'</a>'+
					'<a class=join_partida>ENTRAR</a>'+
				'</li>'
			);
		} else {
			if (id == idPartidaEsperando) {
				$("#container_partidas").append(
					'<li class=partida onclick=leavePartida("'+lista_partidas[id].idPartida+'")>'+
						'<a class=nombre_partida>Nombre partida: '+lista_partidas[id].gameName+'</a>'+
						'<a class=idPartida>'+lista_partidas[id].idPartida+'</a>'+
						'<a class=num_jugadores>'+lista_partidas[id].gamePlayers.length+'/'+lista_partidas[id].gameNumPlayers+'</a>'+
						'<a class="leave_partida">SALIR</a>'+
					'</li>'
				);
			} else {
				//Si estoy en partida me salto las partidas llenas si no son la mía
				if (lista_partidas[id].gamePlayers.length >= lista_partidas[id].gameNumPlayers) {
					continue;
				}
				$("#container_partidas").append(
					'<li class=partida>'+
						'<a class=nombre_partida>Nombre partida: '+lista_partidas[id].gameName+'</a>'+
						'<a class=idPartida>'+lista_partidas[id].idPartida+'</a>'+
						'<a class=num_jugadores>'+lista_partidas[id].gamePlayers.length+'/'+lista_partidas[id].gameNumPlayers+'</a>'+
					'</li>'
				);
			}
		}
	}
}			

function joinPartida(idPartida) {
	console.log("joinPartida()");
	//No estamos en ninguna partida
	var enPartida = false;
	for (var id in lista_partidas) {
		for (var i = 0; i < lista_partidas[id].gamePlayers.length; i++) {
			if (lista_partidas[id].gamePlayers[i] == usuario) {
				enPartida = true;
			}
		}
	}
	if (enPartida == true) {
		alert("Ya has creado o ya estas dentro de alguna partida");
		button_lista_partidas();
	} else {
		socket.emit('join_game', {idPartida: idPartida});
		socket.on('join_game-OK', function() {
			console.log("join_game-OK");
			idPartidaEsperando = idPartida;
			enPartidaEsperando = true;
			button_lista_partidas();
		});
		socket.on('join_game-KO', function(){
			console.log("join_game-KO");
			alert("Servidor alerta que no ha sido posible unirse a la partida. Intentalo de nuevo");
			button_lista_partidas();
		});
	}
}

function leavePartida(idPartida) {
	console.log("leavePartida()");
	var enPartida = false;
	//Estamos en la partida que queremos abandonar
	for (var i = 0; i < lista_partidas[idPartida].gamePlayers.length; i++) {
		if (lista_partidas[idPartida].gamePlayers[i] == usuario) {
			enPartida = true;
		}
	}
	if (enPartida == true) {
		socket.emit('leave_game', {idPartida: idPartida});
		socket.on('leave_game-OK', function() {
			idPartidaEsperando = "";
			enPartidaEsperando = false;
			console.log("leave_game-OK");
			button_lista_partidas();
		});
		socket.on('leave_game-KO', function(){
			console.log("leave_game-KO");
			alert("Servidor alerta que no ha sido posible abandonar a la partida. Intentalo de nuevo");
			button_lista_partidas();
		});
	} else {
		alert("No estas dentro de la partida que quieres abandonar");
		button_lista_partidas();
	}
}
/** -------------------- **/

/** Interaccion con el servidor de la partida **/
socket.on('prepararPartida', function(datos_iniciales){
	console.log("prepararPartida");

	idPartida = datos_iniciales.idPartida;
	jugadores = datos_iniciales.jugadores;
	cartasUsuario.push(datos_iniciales.carta1);
	cartasUsuario.push(datos_iniciales.carta2);
	cartasUsuario.push(datos_iniciales.carta3);

	//Animacion de repartir cartas
	Engine.initCanvas();
	Engine.initJugadores();
	Engine.initPosOrganosJugadores();
	Engine.initPosCartasUsuario();

	ponerJugadores();
	renderBGCards();

	//Crea dos arrays para poder buscar informacion comodamente.
	asignarJugadoresAPosiciones();
	asignarPosicionesAJugadores();

	prepararOrganosJugadoresCli();
	moveObjects();
	actualizarCanvas();
})

function esperarMovimiento(){
	setTimeout(function(){ 
		//checkin
		movJugador = "algo";
		if (movJugador == ""){
			console.log("Esperando movimiento");
			esperarMovimiento();
		} else {
			console.log("Robamos carta");
			takeCard();
			var newDatos_partida = {
				idPartida: idPartida,
				jugadores: jugadores,
				turno: turno,
				deckOfCardsPartida: deckOfCards,
				movJugador: movJugador
			};
			socket.emit('siguienteTurnoSrv', newDatos_partida);
		}
	}, 1000);
}

socket.on('siguienteTurnoCli', function(datos_partida){
	console.log("siguienteTurnoCli");
	idPartida = datos_partida.idPartida;
	jugadores = datos_partida.jugadores;
	turno = datos_partida.turno;
	deckOfCards = datos_partida.deckOfCardsPartida;
	movJugador = datos_partida.movJugador;
	indicarTurno(turno);
	//Representar movimiento (nuestro mov quedara representado en el sig mensaje
	//enviado por el servidor)

	//console.log("Turno: "+turno+" - "+"Usuario: "+usuario);
	if (turno == usuario) {
		movJugador = "";
		esperarMovimiento();
	}
});

socket.on('terminarPartida', function(){
	console.log("Terminar Partida");
	button_lista_partidas();
})
/** -------------------- **/

/**  **/
/** -------------------- **/