//FUNCIONALIDAD CLIENTE

var lista_partidas = {};
var idPartidaEsperando = "";
var enPartidaEsperando = false;
/** Establecimiento de la conexion con el servidor **/
//var socket = io.connect('https://nodejs-server-virusgame.herokuapp.com/');
//Local
var socket = io.connect('localhost:8080');
socket.on('Connection OK', function (data) {
   	//console.log("Cliente conectado. Player_id: "+data.player_id);
   	usuario = data.player_id;
});
/** -------------------- **/

//Comprobamos si hemos abandonado una partida en curso
//checkMatchRunning();

/** Los botones iniciales y el boton volver a inicio**/
function button_create() {
	//console.log("button_create()");
	$("#container_botones").css("display", "none");
	$("#container_form_create").css("display", "inline");
	$("#lista_partidas").css("display", "none");
	$("#canvas_container").css("display", "none");
	$("#registerForm").css("display", "none");
	$("#settings").css("display", "none");
	$("#login").css("display", "none");
	$("#leave").css("display", "none");
	$("#register").css("display", "none");
}

function button_lista_partidas() {
	//console.log("button_lista_partidas()");
	$("#container_botones").css("display", "none");
	$("#container_form_create").css("display", "none");
	actualizar_partidas();
	$("#lista_partidas").css("display", "inline");
	$("#canvas_container").css("display", "none");
	$("#registerForm").css("display", "none");
	$("#settings").css("display", "none");
	$("#login").css("display", "none");
	$("#leave").css("display", "none");
	$("#register").css("display", "none");
}

function backTo_InitMenu() {
	//console.log("backTo_InitMenu()");
	$("#container_botones").css("display", "inline");
	$("#container_form_create").css("display", "none");
	$("#lista_partidas").css("display", "none");
	$("#canvas_container").css("display", "none");
	$("#registerForm").css("display", "none");
	$("#settings").css("display", "inline");
	$("#login").css("display", "inline");
	$("#leave").css("display", "inline");
	$("#register").css("display", "inline");
}

function button_login () {
	console.log("button_login()");
}

function button_registerForm () {
	console.log("button_register()");
	//console.log("Display: "+$("#registerForm").css("display"));
	if ($("#registerForm").css("display") == "block") {
		$("#registerForm").css("display","none");
	} else {
		$("#registerForm").css("display","block");
	}
}

function button_leave () {
	console.log("button_leave()");
}

function button_ranquing () {
	console.log("button_ranquing()");
}

function button_settings () {
	console.log("button_settings");
}
/** -------------------- **/

/** Interaccion con el servidor de los botones iniciales **/
function form_register() {
	var registerName = document.form_register_user.registerName.value;
	var registerPass1 = document.form_register_user.registerPass1.value;
	var registerPass2 = document.form_register_user.registerPass2.value;

	if (registerPass1 != registerPass2) {
		console.log("Las contraseñas no coinciden");
	} else {
		socket.emit('register_user', {user: registerName, pass: registerPass1});
	}

	return false;
}

socket.on('register_user-OK', function() {
	console.log("register_user-OK");
});

socket.on('register_user-KO', function(data) {
	console.log("register_user-KO");
	if (data.usuarioRepetido == "true") {
		console.log("Usuario ya en uso");
	}
});

function form_createGame() {
	//console.log("form_createGame()");
	var gameName = document.form_create_game.gameName.value;
	var gameNumPlayers = document.form_create_game.gameNumPlayers.value;
	//console.log("gameName: "+gameName);
	//console.log("gameNumPlayers: "+gameNumPlayers);
	 if (gameName == "") {
	 	gameName = "Juego de: "+usuario.substr(0,6);
	 }

	socket.emit('create_game', 
		{creador: usuario, gameName: gameName, gameNumPlayers: gameNumPlayers});
	//Pantalla de lista de espera
	return false;
}

socket.on('create_game-OK', function(data){
	//console.log("Recibido: create_game-OK");
	idPartidaEsperando = data.idPartida;
	enPartidaEsperando = true;
	button_lista_partidas();
})

socket.on('create_game-KO', function(){
	//console.log("Recibido: create game-KO");
	alert("Ya has creado o ya estas dentro de alguna partida");
	button_lista_partidas();
})

function actualizar_partidas(){
	//console.log("function actualizar_partidas()");
	socket.emit('actualizar_partidas');
}

socket.on('actualizar_partidas', function(data){
	//console.log("Recibido: actualizar_partidas");
	lista_partidas = data;
	actualizar_listaPartidas();
})

function actualizar_listaPartidas() {
	//console.log("function actualizar_listaPartidas()");
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
		if (enPartidaEsperando == false) {
			//Si no estoy en partida y la sala esta llena, me la salto
			if (lista_partidas[id].gamePlayers.length >= lista_partidas[id].gameNumPlayers) {
				continue;
			}
			$("#container_partidas").append(
				'<li class=partida onclick=joinPartida("'+lista_partidas[id].idPartida+'","'+false+'")>'+
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

function joinPartida(idPartida , flag) {
	//console.log("joinPartida()");

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
		socket.emit('join_game', {idPartida: idPartida, random: flag});
		socket.on('join_game-OK', function(data) {
			console.log("join_game-OK");
			idPartidaEsperando = data.idPartida;
			enPartidaEsperando = true;
			button_lista_partidas();
		});
		socket.on('join_game-KO', function(){
			//console.log("join_game-KO");
			alert("Servidor alerta que no ha sido posible unirse a la partida. Intentalo de nuevo");
			button_lista_partidas();
		});
	}
}

function leavePartida(idPartida) {
	//console.log("leavePartida()");
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
			//console.log("leave_game-KO");
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
function checkMatchRunning(){
	var idPartidaStored = localStorage.getItem('idPartida');

	if ((idPartidaStored != undefined) && (idPartidaStored != "") && (idPartidaStored != null)) {
		console.log("Hay una partida abandonada");
		console.log("Tratamos de entrar de nuevo");
		var usuarioAntiguo = localStorage.getItem('usuario', usuario);

		//Preguntamos al servidor si en el id de partida que tenemos guardado, esta nuestro nuevo id o el antiguo
		console.log("idPartida: "+idPartidaStored);
		console.log("usuario: "+usuario);
		console.log("usuarioAntiguo: "+usuarioAntiguo);
		var datos = {
			idPartida: idPartidaStored,
			usuario: usuario,
			usuarioAntiguo: usuarioAntiguo
		}
		socket.emit('checkMatchRunning', datos);
			//Si es que si pedimos al servidor que cambie de sus variables el antiguo id por el nuevo
			//Pedimos datos de la partida->Si he ido programando bien, con que nos pase prepararPartida deberia valer
	} else {
		console.log("No hay partidas empezadas");
	}
}

socket.on('checkMatchRunningKO', function(){
	//Aunque el usuario tiene guardada la partida, el servidor no.
	//Puede ser porque la partida ha terminado o porque el servidor le ha expulsado de la partida definitivamente
	//o porque el usuario ha salido de la app bruscamente y no se ha borrado correctamente el localStorage
	console.log("checkMatchRunningKO");
	localStorage.removeItem('idPartida');
})

socket.on('prepararPartida', function(datos_iniciales){
	console.log("prepararPartida");

	idPartida = datos_iniciales.idPartida;
	//No guardamos al usuario antes, no nos hace falta e igualmente debemos guardalo aqui si tenemos un idPartida
	//guardado pero el servidor ya ha eliminado la partida o nos ha eliminado de la partida
	localStorage.setItem('usuario', usuario);
	localStorage.setItem('idPartida', idPartida);
	jugadores = datos_iniciales.jugadores;
	cartasUsuario.push(datos_iniciales.carta1);
	cartasUsuario.push(datos_iniciales.carta2);
	cartasUsuario.push(datos_iniciales.carta3);

	//Animacion de repartir cartas
	Engine.initCanvas();
	Engine.initJugadores();
	Engine.initPosOrganosJugadores();
	Engine.initCubosDescarte();
	Engine.initPosCartasUsuario();
	Engine.initFinDescartesButton();

	renderBGCards();

	//Crea dos arrays para poder buscar informacion comodamente.
	asignarJugadoresAPosiciones();
	asignarPosicionesAJugadores();

	prepararOrganosJugadoresCli();
	moveObjects();

	actualizarCanvas();
	//actualizarCanvasMID();
})

function esperarMovimiento(){
	esperarMovSTO = setTimeout(function(){ 
		if (movJugador == "") {
			//console.log("Esperando movimiento");
			esperarMovimiento();
		} else {

			if (movJugador == "tiempo_agotado") {
				var newDatos_partida = {
					idPartida: idPartida,
					jugadores: jugadores,
					turno: turno,
					deckOfCardsPartida: deckOfCards,
					organosJugadoresCli: organosJugadoresCli,
					movJugador: movJugador
				};
				socket.emit('tiempo_agotado', newDatos_partida);
			} 
			if (turno == usuario) {
				//Comprobamos si hay ganador
				var ganador = checkPartidaTerminada();
				if (ganador != "") {
					console.log("Hemos ganado");
					var data = {
						idPartida: idPartida
					}
					socket.emit('terminarPartida', data);
				} else {
					//Si no hay ganador seguimos con el juego
					console.log("Robamos carta y nuestro movimiento ha sido: "+movJugador);
					//Esto de robar carta deberiamos comprobarlo.
					takeCard();
					var newDatos_partida = {
						idPartida: idPartida,
						jugadores: jugadores,
						turno: turno,
						deckOfCardsPartida: deckOfCards,
						organosJugadoresCli: organosJugadoresCli,
						movJugador: movJugador
					};
					socket.emit('siguienteTurnoSrv', newDatos_partida);
				}
			}
		}
	}, 250);
}

function checkPartidaTerminada(){
	var totalOrganosCompletos;
	for (var jugador in organosJugadoresCli) {
		totalOrganosCompletos = 0;
		if ((organosJugadoresCli[jugador].cerebro == "normal") ||
			(organosJugadoresCli[jugador].cerebro == "vacunado") ||
			(organosJugadoresCli[jugador].cerebro == "inmunizado")) {

			totalOrganosCompletos++;
		}
		if ((organosJugadoresCli[jugador].corazon == "normal") ||
			(organosJugadoresCli[jugador].corazon == "vacunado") ||
			(organosJugadoresCli[jugador].corazon == "inmunizado")) {
			
			totalOrganosCompletos++;
		}
		if ((organosJugadoresCli[jugador].hueso == "normal") ||
			(organosJugadoresCli[jugador].hueso == "vacunado") ||
			(organosJugadoresCli[jugador].hueso == "inmunizado")) {
			
			totalOrganosCompletos++;
		}
		if ((organosJugadoresCli[jugador].higado == "normal") ||
			(organosJugadoresCli[jugador].higado == "vacunado") ||
			(organosJugadoresCli[jugador].higado == "inmunizado")) {
			
			totalOrganosCompletos++;
		}
		if ((organosJugadoresCli[jugador].organoComodin == "normal") ||
			(organosJugadoresCli[jugador].organoComodin == "vacunado") ||
			(organosJugadoresCli[jugador].organoComodin == "inmunizado")) {
			
			totalOrganosCompletos++;
		}

		if (totalOrganosCompletos >= 4){
			return jugador;
		}
	}
	return "";
}

socket.on('siguienteTurnoCli', function(datos_partida){
	//console.log("siguienteTurnoCli");
	clearTimeout(countDownSTO);
	clearTimeout(esperarMovSTO);

	idPartida = datos_partida.idPartida;
	jugadores = datos_partida.jugadores;
	turno = datos_partida.turno;
	deckOfCards = datos_partida.deckOfCardsPartida;

	//Comprobamos si nos estamos reenchando a la partida
	if (cartasUsuario.length <= 0){
		handleReconect();
	}

	if (datos_partida.organosJugadoresCli != undefined){
		for (var jugador in datos_partida.organosJugadoresCli){
			organosJugadoresCli[jugador].cerebro = datos_partida.organosJugadoresCli[jugador].cerebro;
			organosJugadoresCli[jugador].corazon = datos_partida.organosJugadoresCli[jugador].corazon;
			organosJugadoresCli[jugador].higado = datos_partida.organosJugadoresCli[jugador].higado
			organosJugadoresCli[jugador].hueso = datos_partida.organosJugadoresCli[jugador].hueso;
			organosJugadoresCli[jugador].organoComodin = datos_partida.organosJugadoresCli[jugador].organoComodin;
		}
	}

	movJugador = datos_partida.movJugador;
	//Representar movimiento (nuestro mov quedara representado en el sig mensaje
	//enviado por el servidor)
	//Pendiente
	//Una vez representado el movimiento del jugador, borramos el mov
	movJugador = "";
	indicarTurno(turno);

	esperarMovimiento(); //->setTimeOut
	renderCountDown(30, new Date()); //->setTimeOut
});

function handleReconect(){
	console.log("handleReconect");

	//No guardamos al usuario antes, no nos hace falta e igualmente debemos guardalo aqui si tenemos un idPartida
	//guardado pero el servidor ya ha eliminado la partida o nos ha eliminado de la partida
	localStorage.setItem('usuario', usuario);
	localStorage.setItem('idPartida', idPartida);

	var carta1 = takeCard();
	var carta2 = takeCard();
	if (carta2 == null) {
		console.log("handleReconect - La carta 2 es null");
		carta2 = carta1;
	}
	var carta3 = takeCard();
		if (carta3 == null) {
		console.log("handleReconect - La carta 3 es null");
		carta3 = carta1;
	}

	//Un poco tricky porque:
	//1.- Si no es tu turno, otro tipo robara de nuevo cartas que has robado
	//2.- Si no hay suficientes cartas en el mazo al menos puedes robar una y la repites
	//Solucion: tener una baraja entera y robar cartas aleatorias de ahi
	cartasUsuario.push(carta1);
	cartasUsuario.push(carta2);
	cartasUsuario.push(carta3);

	//Animacion de repartir cartas
	Engine.initCanvas();
	Engine.initJugadores();
	Engine.initPosOrganosJugadores();
	Engine.initCubosDescarte();
	Engine.initPosCartasUsuario();
	Engine.initFinDescartesButton();

	renderBGCards();

	//Crea dos arrays para poder buscar informacion comodamente.
	asignarJugadoresAPosiciones();
	asignarPosicionesAJugadores();

	prepararOrganosJugadoresCli();
	moveObjects();

	actualizarCanvas();
	//actualizarCanvasMID();
}

socket.on('terminarPartida', function(data){
	console.log("Terminar Partida");
	console.log("Ganador: "+data.ganador);
	localStorage.removeItem('idPartida');
	button_lista_partidas();
})
/** -------------------- **/

/**  **/
/** -------------------- **/