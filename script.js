let order = [];
let clickOrder = [];
let score = 0;


//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');
const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
let hscore = document.querySelector('.score');


//cria ordem aleatoria de cores
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickOrder = [];

    for (let i in order) {
        let elementColor = creatColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }

}

//acende a próxima cor
let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);
    setTimeout(() => {
        element.classList.remove('selected');
    }, number);
}


//checa se os botões clicados são os mesmos da ordem automática do game
let checkOrder = () => {
    let gainOrder = true;
    for (let i in clickOrder) {
        if (clickOrder[i] != order[i]) {
            gainOrder = false;
            gameOver();
            break;
        }
    }
    if (clickOrder.length == order.length && gainOrder == true) {
        alert(`Pontuação ${score+1}\nParabéns! Iniciando próximo nível`);
        nextLevel();               
    }
}

//função para o clique do usuário
let click = (color) => {
    clickOrder[clickOrder.length] = color;
    creatColorElement(color).classList.add('selected');

    setTimeout(() => {
        creatColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250);
}

//criar a função que retorna a cor
let creatColorElement = (color) => {
    switch (color) {
        case 0:
            return green;
        case 1:
            return red;
        case 2:
            return yellow;
        case 3:
            return blue;
        default:
            alert('Erro de cor, atualize a página!')
            break;
    }
}

//objeto com função de manipulação da pontuação
let points = {
    up: () => {
        score++;
        hscore.textContent = score;
    },
    reset: () => {
        score = 0;
        hscore.textContent = score;
    }
}

//função para próximo nivel
let nextLevel = () => {
    points.up();
    shuffleOrder();
}

//função para gamer over
let gameOver = () => {
    alert(`Você Perdeu!\nPontuação: ${score}\nClique em ok para iniciar um novo jogo.`);
    order = [];
    clickOrder = [];
    window.location.reload();
}

//função para começar o jogo.
let playGame = () => {
    points.reset();
    setTimeout(() => { shuffleOrder() }, 2000)
}


//evento de click para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);


playGame();