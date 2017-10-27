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

/**

	cx.fillStyle = '#f0f0f0';
	cx.fillRect(0,0,windowWidth,windowHeight);
	for (var i = 0; i < objetos.length; i++){
		cx.fillStyle = objetos[i].color;
		cx.fillRect(objetos[i].x, objetos[i].y, objetos[i].width, objetos[i].height);
	}


	<div id="container_nickname">
		<input class="user_form" type="text" placeholder=":input">
		<a class="user_form" id="boton_borrar" title="Borrar" onclick="button_delete()"></a>
	</div>

**/

if (cardType == "organo") {
		if (posDestino == 1){
			var widthOrgano = posOrganosJugadores[posDestino-1][0];
			var heightOrgano = posOrganosJugadores[posDestino-1][1];
			var posOrgano = null;
			var src = cartasUsuario[numCarta].picture;
			switch (organType){
			case "cerebro":
				posOrgano = posOrganosJugadores[posDestino-1][2];
				break;
			case "corazon":
				posOrgano = posOrganosJugadores[posDestino-1][3];
				break;
			case "hueso":
				posOrgano = posOrganosJugadores[posDestino-1][4];
				break;
			case "higado":
				posOrgano = posOrganosJugadores[posDestino-1][5];
				break;
			default:
				alert("ValidarMov: cardType erroneo")
				break;
			}

			renderOrgano(widthOrgano, heightOrgano, posOrgano, src, "normal");
			//Mandamos movimiento al servidor
			nuevaCarta(numCarta);
			actualizarCanvas();
		} else {
			alert("Movimiento no valido");
		}