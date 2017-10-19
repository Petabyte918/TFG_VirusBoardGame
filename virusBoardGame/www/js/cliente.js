//FUNCIONALIDAD CLIENTE


/** Establecimiento de la conexion con el servidor **/
var lista_partidas = {};
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
	
}

function button_create() {
	console.log("button_create()");
	$("#container_botones").css("display", "none");
	$("#container_form_create").css("display", "inline");
	$("#lista_partidas").css("display", "none");
}

function button_lista_partidas() {
	console.log("button_lista_partidas()");
	$("#container_botones").css("display", "none");
	$("#container_form_create").css("display", "none");
	//Comprobar actualizaciones de la lista de partidas
	actualizar_partidas();
	//Pedir que me envien periodicamente una lista (para no complicarlo, 
	//que el servidor se la mande a todo el mundo todo el rato)
	$("#lista_partidas").css("display", "inline");
}

function backTo_InitMenu() {
	console.log("backTo_InitMenu()");
	$("#container_botones").css("display", "inline");
	$("#container_form_create").css("display", "none");
	$("#lista_partidas").css("display", "none");
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

socket.on('create_game-OK', function(){
	console.log("Recibido: create_game-OK");
	var strAleat = toString(Math.round(Math.random()*100));
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
	$(".container_partidas").empty();
	for (var id in lista_partidas) {
		//Si has creado la partida un icono que sea borrar partida
		//Si estas dentro de la partida un icono que sea salir
		$(".container_partidas").append(
			'<li class=partida onclick=joinPartida("'+lista_partidas[id].idPartida+'")>'+
				'<a class=nombre_partida>Nombre partida: '+lista_partidas[id].gameName+'</a>'+
				'<a class=idPartida>'+lista_partidas[id].idPartida+'</a>'+
				'<a class=num_jugadores>'+lista_partidas[id].gamePlayers.length+'/'+lista_partidas[id].gameNumPlayers+'</a>'+
				'<a class=join_partida>ENTRAR</a>'+
			'</li>'
		);
	}
}

function joinPartida(idPartida){
	console.log("WORKS: "+idPartida);
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
			button_lista_partidas();
		});
		socket.on('join_game-KO', function(){
			alert("Servidor alerta que no ha sido posible unirse a la partida. Intentalo de nuevo");
			button_lista_partidas();
		});
	}
}

function leavePartida(){

}
/** -------------------- **/

/** Interaccion con el servidor de la partida **/
socket.on('game_ready', function(){

})

socket.on('game_end', function(){

})
/** -------------------- **/


