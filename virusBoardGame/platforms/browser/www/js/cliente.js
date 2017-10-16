//FUNCIONALIDAD CLIENTE

var lista_partidas = {};
//var socket = io.connect('https://nodejs-server-virusgame.herokuapp.com/');
//Local
var socket = io.connect('localhost:8080');
socket.on('Connection OK', function (data) {
   	console.log("Cliente conectado. Player_id: "+data.player_id);
   	usuario = data.player_id;
});

function button_play(){
	
}

function button_create(){
	console.log("button_create()");
	$("#container_botones").css("display", "none");
	$("#container_form_create").css("display", "inline");
}

function backTo_InitMenu(){
	console.log("backTo_InitMenu()");
	$("#container_botones").css("display", "inline");
	$("#container_form_create").css("display", "none");
}

function form_createGame(){
	console.log("form_createGame()");
	var gameName = document.form_create_game.gameName.value;
	var gameNumPlayers = document.form_create_game.gameNumPlayers.value;
	console.log("gameName: "+gameName);
	console.log("gameNumPlayers: "+gameNumPlayers);
	 if (gameName == "") {
	 	gameName = "Juego de: "+usuario.substr(0,6);
	 }

	socket.emit('create_game', {creador: usuario, gameName: gameName, gameNumPlayers:gameNumPlayers});
	//Pantalla de lista de espera
	return false;
}

socket.on('create_game-OK', function(data){
	console.log("Recibido: create_game-OK");
})

socket.on('actualizar_partidas', function(data){
	lista_partidas = data;
	console.log("Recibido: actualizar_partidas");
})

socket.on('game_ready', function(){

})

socket.on('game_end', function(){

})

function button_list(){
	
}

