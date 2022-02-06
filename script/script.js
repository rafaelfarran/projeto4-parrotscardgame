let cards = [];
let rightPairs = [];
let clickStatus = false;
let selectedCard = null;
let qntPairs = null;
let timer = null;
let plays = 0;
HowManyCards();

function HowManyCards(){
    let condicao = true;
    let quantidadeCartas = null;

    while(condicao === true){
        quantidadeCartas = prompt("Insira a quantidade de cartas: (4-14)");
        if(quantidadeCartas >= 4 && quantidadeCartas <= 14 && quantidadeCartas%2==0)
            condicao = false;
    }

    for(let i=0; i<(quantidadeCartas/2); i++){
        cards.push(i);
        cards.push(i);
    }

    qntPairs = quantidadeCartas/2;
    cards.sort(comparador);
    
    insereCartas(quantidadeCartas);
}

function insereCartas(quantidadeCartas){

    let main = document.querySelector("main");

    for(let i=0; i<quantidadeCartas; i++){
        main.innerHTML = main.innerHTML 
            + `<div class='card par${cards[i]}' onclick='clickCarta(this)' data-identifier="card"><div class="front-face face" data-identifier="front-face"><img src='imagens/front.png'></div><div class='back-face face' data-identifier="back-face">` 
            + tipoGif(cards[i]) 
            + "</div></div>";
    }
}

function tipoGif(indice){
    let imagem = null;

    switch(indice){
        case 0:
            imagem = "<img src='imagens/bobrossparrot.gif'>";
            break;
            
        case 1:
            imagem = "<img src='imagens/explodyparrot.gif'>";
            break;
            
        case 2:
            imagem = "<img src='imagens/fiestaparrot.gif'>";
            break;
            
        case 3:
            imagem = "<img src='imagens/metalparrot.gif'>";
            break;
            
        case 4:
            imagem = "<img src='imagens/revertitparrot.gif'>";
            break;
            
        case 5:
            imagem = "<img src='imagens/tripletsparrot.gif'>";
            break;
            
        case 6:
            imagem = "<img src='imagens4/unicornparrot.gif'>";
            break;
            
        default:
            imagem = "";
            break;
    }

    return imagem;
}

function clickCarta(carta){
    const back = carta.querySelector(".back-face");

    if(plays == 0){
        timer = setInterval(contaTempo, 1000);
    }

    if(back.classList.contains("back-click") === false){
        virarCarta (carta);
        plays = plays + 1;
        if(clickStatus === false){
            selectedCard = carta;
            clickStatus = true;
        }
        else if(selectedCard.classList[1] !== carta.classList[1]){
            clickStatus = false;
            setTimeout(virarCarta,1000,selectedCard);
            setTimeout(virarCarta,1000,carta);
            selectedCard = null
        }
        else {
            clickStatus = false;
            rightPairs.push(carta.classList[1]);
        }

        if(rightPairs.length === qntPairs){
            clearTimeout(timer);
            setTimeout(jogoTerminou,1000);
        }
    }
}

function comparador() { 
	return Math.random() - 0.5; 
}

function virarCarta(carta){
    const back = carta.querySelector(".back-face");
    back.classList.toggle("back-click");

    const front = carta.querySelector(".front-face");
    front.classList.toggle("front-click");
}

function jogoTerminou(){
    const relogio = document.querySelector(".relogio");
    alert(`Você ganhou em ${plays} jogadas e em ${relogio.innerHTML} segundos!`);

    let condicao = true;
    while(condicao === true){
        resposta = prompt("Deseja reiniciar a partida? (s ou n)");
        if(resposta === "s"){
            condicao = false;
            cards = [];
            rightPairs = [];
            clickStatus = false;
            selectedCard = null;
            qntPairs = null;
            timer = null;
            plays = 0;

            let main = document.querySelector("main");
            main.innerHTML = "";

            HowManyCards();

        }else if(resposta === "n"){
            condicao = false;
        }
    }

}

function contaTempo(){
    const relogio = document.querySelector(".relogio");
    relogio.innerHTML = parseInt(relogio.innerHTML) + 1;
}