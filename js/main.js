//Bienvenida
alert(
  "Bienvenido al juego de piedra, papel o tijera \nJugaras 3 rondas, el jugador que obtenga más puntos será el ganador"
);

//puntajes
let playerPoints = 0;
let computerPoints = 0;

//funcion que permite obtener la opcion elejida por el usuario
function playerSelection() {
  let selection = prompt(
    "Escribe el nombre de tu arma: \n1. Piedra \n2. Papel \n3. Tijeras"
  );
  let selectionLowerCase = selection.toLocaleLowerCase();

  alert(`Jugador: ${selectionLowerCase}`);
  return selection;
}

//Funcion que permite crear la opcion seleccionada por la computadora de forma aleatoria
function getComputerChoice() {
  let options = ["piedra", "papel", "tijeras"];
  choice = Math.floor(Math.random() * 3);

  if (choice == 0) {
    alert(`Computadora: ${options[0]}`);
    return options[choice];
  } else if (choice == 1) {
    alert(`Computadora: ${options[1]}`);
    return options[choice];
  } else if (choice == 2) {
    alert(`Computadora: ${options[2]}`);
    return options[choice];
  } else {
    alert("Error");
  }
}

//funcion que realiza el juego
function playRound(player, computer) {
  if (player == computer) {
    alert("Es un empate, el marcador se mantiene");
    alert(
      `Puntaje Jugador: ${playerPoints} \nPuntaje Computadora: ${computerPoints}`
    );
  } else if (player == "piedra" && computer == "tijeras") {
    playerPoints++;
    alert(
      `Puntaje Jugador: ${playerPoints} \nPuntaje Computadora: ${computerPoints}`
    );
  } else if (player == "piedra" && computer == "papel") {
    computerPoints++;
    alert(
      `Puntaje Jugador: ${playerPoints} \nPuntaje Computadora: ${computerPoints}`
    );
  } else if (player == "papel" && computer == "piedra") {
    playerPoints++;
    alert(
      `Puntaje Jugador: ${playerPoints} \nPuntaje Computadora: ${computerPoints}`
    );
  } else if (player == "papel" && computer == "tijeras") {
    computerPoints++;
    alert(
      `Puntaje Jugador: ${playerPoints} \nPuntaje Computadora: ${computerPoints}`
    );
  } else if (player == "tijeras" && computer == "piedra") {
    playerPoints++;
    alert(
      `Puntaje Jugador: ${playerPoints} \nPuntaje Computadora: ${computerPoints}`
    );
  } else if (player == "tijeras" && computer == "papel") {
    computerPoints++;
    alert(
      `Puntaje Jugador: ${playerPoints} \nPuntaje Computadora: ${computerPoints}`
    );
  } else if (
    player == "" &&
    (computer == "piedra" || computer == "papel" || computer == "tijeras")
  ) {
    computerPoints++;
    alert(
      `Error! tienes que ingresar una opcion, pierdes un punto. \nPuntaje Jugador: ${playerPoints} \nPuntaje Computadora: ${computerPoints}`
    );
  }
}

//ciclo for que hace que el juego se repita 3 veces
for (let i = 0; i < 3; i++) {
  playRound(playerSelection(), getComputerChoice());
}

// Definir el ganador mediante la cantidad de puntos obtenidos
if (playerPoints > computerPoints) {
  alert(
    `Felicidades! ganaste \nPuntaje jugador: ${playerPoints} \nPuntaje computadora: ${computerPoints}`
  );
} else if (computerPoints > playerPoints) {
  alert(
    `Lo siento! perdiste \nPuntaje jugador: ${playerPoints} \nPuntaje computadora: ${computerPoints}`
  );
}
