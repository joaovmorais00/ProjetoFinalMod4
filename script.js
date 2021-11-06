const btn1 = document.querySelector("#btn1");
const btn2 = document.querySelector("#btn2");
const btn3 = document.querySelector("#btn3");
const btn4 = document.querySelector("#btn4");
const btn5 = document.querySelector("#btn5");
const btn6 = document.querySelector("#btn6");
const btn7 = document.querySelector("#btn7");
const btn8 = document.querySelector("#btn8");
const btn9 = document.querySelector("#btn9");

const player1 = document.querySelector("#player1");
const player2 = document.querySelector("#player2");

const btnRestart = document.querySelector(".btnRestart");
const btnZerar = document.querySelector(".btnZerar");

let playing = 1;
let activePlayer = 1;
let matriz = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
let numVitorias1 = 0;
let numVitorias2 = 0;

const restart = () => {
	document.querySelector("#player1").classList.remove("player--winner");
	document.querySelector("#player2").classList.remove("player--winner");

	for (let casa in matriz) {
		matriz[casa] = 0;
		document.querySelector(`#x${casa}`).classList.add("hidden");
		document.querySelector(`#o${casa}`).classList.add("hidden");
		document.querySelector(`#btn${casa}`).classList.add("pointer");
		document.querySelector(`#btn${casa}`).classList.remove("not-Allowed");
	}
	playing = 1;
	activePlayer = 1;
	document.querySelector("#winner1").textContent = "";
	document.querySelector("#winner2").textContent = "";
	player1.classList.add("player--active");
	player2.classList.remove("player--active");
};

const zerar = () => {
	restart();
	numVitorias1 = 0;
	document.querySelector("#victorys1").innerHTML = 0;
	numVitorias2 = 0;
	document.querySelector("#victorys2").innerHTML = 0;
};

const switchPlayer = () => {
	activePlayer = activePlayer === 1 ? 2 : 1;
	player1.classList.toggle("player--active");
	player2.classList.toggle("player--active");
};

const setaSimbolo = (casa) => {
	if (matriz[casa] === 0 && playing) {
		if (activePlayer === 1) {
			document.querySelector(`#x${casa}`).classList.remove("hidden");
			document.querySelector(`#btn${casa}`).classList.remove("pointer");
			document.querySelector(`#btn${casa}`).classList.add("not-Allowed");
			matriz[casa] = 1;
		} else if (activePlayer === 2) {
			document.querySelector(`#o${casa}`).classList.remove("hidden");
			document.querySelector(`#btn${casa}`).classList.remove("pointer");
			document.querySelector(`#btn${casa}`).classList.add("not-Allowed");
			matriz[casa] = 2;
		}
		if (confereVitoria()) setaVencedor();
		else {
			if (confereVelha()) setaVelha();
			else switchPlayer();
		}
	}
};

const confereCasasIguais = (primeira, segunda, terceira) => {
	if (
		matriz[primeira] !== 0 &&
		matriz[segunda] !== 0 &&
		matriz[terceira] !== 0 &&
		matriz[primeira] === matriz[segunda] &&
		matriz[primeira] === matriz[terceira]
	) {
		return true;
	}
};

const setaVencedor = () => {
	document
		.querySelector(`#player${activePlayer}`)
		.classList.add("player--winner");
	if (activePlayer === 1) {
		numVitorias1++;
		document.querySelector(`#victorys${activePlayer}`).innerHTML = numVitorias1;
	} else if (activePlayer === 2) {
		numVitorias2++;
		document.querySelector(`#victorys${activePlayer}`).innerHTML = numVitorias2;
	}
	document.querySelector(`#winner${activePlayer}`).textContent = "Won!";

	for (let i = 1; i <= 9; i++)
		document.querySelector(`#btn${i}`).classList.add("not-Allowed");
	document.querySelector("h1").style.color = "#c7365f";
	playing = 0;
};

const setaVelha = () => {
	document.querySelector("h1").style.color = "#c7365f";
	document.querySelector("#player1").classList.add("player--winner");
	document.querySelector("#player2").classList.add("player--winner");
	document.querySelector("#winner1").textContent = "Deu Velha!";
	document.querySelector("#winner2").textContent = "Deu Velha!";
	playing = 0;
};

const confereVitoria = () => {
	if (
		confereCasasIguais(1, 2, 3) ||
		confereCasasIguais(4, 5, 6) ||
		confereCasasIguais(7, 8, 9) ||
		confereCasasIguais(1, 4, 7) ||
		confereCasasIguais(2, 5, 8) ||
		confereCasasIguais(3, 6, 9) ||
		confereCasasIguais(1, 5, 9) ||
		confereCasasIguais(3, 5, 7)
	)
		return true;
	else return false;
};

const confereVelha = () => {
	for (let casa in matriz) {
		if (matriz[casa] === 0) return false;
	}
	return true;
};

btn1.addEventListener("click", () => setaSimbolo(1));

btn2.addEventListener("click", () => setaSimbolo(2));

btn3.addEventListener("click", () => setaSimbolo(3));

btn4.addEventListener("click", () => setaSimbolo(4));

btn5.addEventListener("click", () => setaSimbolo(5));

btn6.addEventListener("click", () => setaSimbolo(6));

btn7.addEventListener("click", () => setaSimbolo(7));

btn8.addEventListener("click", () => setaSimbolo(8));

btn9.addEventListener("click", () => setaSimbolo(9));

btnRestart.addEventListener("click", restart);

btnZerar.addEventListener("click", zerar);
