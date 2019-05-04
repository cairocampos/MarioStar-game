// Criando o canvas
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
canvas.height = 480;
canvas.width = 512;

// Adicionando o canvas no corpo do body.
document.body.appendChild(canvas);

// Criando a imagem de fundo
bgReady = false;
bgImage = new Image();
bgImage.onload = function(){
	bgReady = true;
}
bgImage.src = 'img/background.png';

// Criando o Mario
marioReady = false;
marioImage = new Image();
marioImage.onload = function(){
	marioReady = true;
}
marioImage.src = 'img/mario.png';

// Criando a Estrela
starReady = false;
starImage = new Image();
starImage.onload = function(){
	starReady = true;
}
starImage.src = 'img/star.png';

// Objetos do jogo
const mario = {
	speed: 5
};

const star = {};

const keysDown = {};

window.addEventListener('keydown', function(e){
	keysDown[e.keyCode] = true;
});

window.addEventListener('keyup', function(e){
	delete keysDown[e.keyCode];
});

// Pontuação do jogo
var score = 0;

function reset() {
	// Posicionando a estrela de forma randômica
	star.x = 32 + (Math.random() * (canvas.width - 64));
	star.y = 32 + (Math.random() * (canvas.height - 64));
}

function update(){
	//Controle do jogo

	// Seta pra cima
	if(38 in keysDown) {
		mario.y -= mario.speed;
	}
	//Seta pra baixo
	if(40 in keysDown) {
		mario.y += mario.speed;
	}
	// Seta pra esquerda
	if(37 in keysDown) {
		mario.x -= mario.speed;
	}
	// Seta pra direita
	if(39 in keysDown) {
		mario.x += mario.speed;
	}

	// Verificar se os elementos se encostaram
	if(	mario.x <= (star.x + 32) && star.x <= (mario.x + 32) && mario.y <= (star.y + 32) && star.y <= (mario.y + 32)) {
		//Caso essa condição seja satisfeita, o score sera incrementado e o jogo será resetado.
		score++;
		reset();
	}
}

function render(){
	//Desenhando o background no canvas.
	if(bgReady == true) {
		context.drawImage(bgImage, 0, 0);
	}
	// Desenhando os personagens na tela
	if(marioReady == true) {
		context.drawImage(marioImage, mario.x, mario.y);
	}
	if(starReady == true) {
		context.drawImage(starImage, star.x, star.y);
	}
}

function start(){
	document.getElementById('score').innerHTML = "Score: " + score;
	render();
	update();

	//Função para melhorar o desempenho do canvas.
	requestAnimationFrame(start);
}

// Funções para iniciar o jogo.
window.onload = function(){
	// Posicionando o Mario no meio da tela
	mario.x = canvas.width / 2;
	mario.y = canvas.height / 2;
	
	reset();
	start();
}
