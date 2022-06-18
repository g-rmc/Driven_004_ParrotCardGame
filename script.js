function comparador() { 
	return Math.random() - 0.5; 
}

// INCLUSÃO DAS CARTAS NO JOGO

const jogo = document.querySelector(".jogo");
let NumCartas ;
let cliques = 0;
let tempo = 0;
let stopTimer = 0;

function inicio () {

    // >>> Entrada do número de cartas

    alert ("Bem vinde ao jogo da memória\n\nParrot Card Game\n\nPor g-rmc :D")

    NumCartas = prompt("Insira aqui o número de cartas");

        while (EhValido(NumCartas) === false) {
            alert ("Somente números pares entre 4 e 14!!");
            NumCartas = prompt("Insira aqui o número de cartas");
        }

    // >>> Trazer lista aleatória de gifs de papagaios

    let listaGif = DistPapagaios(NumCartas/2);

    // >>> Criação das cartas individuais (meio deck)

    let meioDeck = [];

    for (let i = 0; i < NumCartas/2; i++) {
        
        
        meioDeck.push(`
        <div class="carta" data-identifier="card" onclick="CartaSelecionada(this)">

            <div class="face-estatica" data-identifier="back-face">
              <img src="imagens/front.png" alt="">
            </div>

            <div class="face-gif" data-identifier="front-face">
                <img src="${listaGif[i]}" alt="">
            </div>

        </div>
        `)
    }

    // >>> Criação das duplas (deck)

    let deck = meioDeck.concat(meioDeck);

    // >>> Embaralhando o deck

    deck = deck.sort(comparador);

    // >>> Inserção das cartas no DOM

    for (let i = 0; i < NumCartas; i++){
        jogo.innerHTML += deck[i];
    }

    // >>> Ativar o cronometro

    timer ();

}

inicio ();

// CLICANDO NA CARTA

function CartaSelecionada (carta) {

    cliques += 1;

    // A carta esta virada?

    if (carta.classList.contains("virada")){

        // Nada acontece

    } else {
        VirarCarta (carta);
    
        // A carta é a primeira ou a segunda da jogada?

        cartasViradas = document.querySelectorAll(".carta.virada").length;

        if (cartasViradas % 2 !== 0) {

            // É a primeira carta da jogada

            carta.classList.add("em-jogo");

        } else {

            // É a segunda carta da jogada

            let PrimeiraCarta = document.querySelector(".carta.virada.em-jogo");
            let SegundaCarta = carta;

            if(EhIgual(PrimeiraCarta,SegundaCarta)){

                PrimeiraCarta.classList.remove("em-jogo");

            } else {

                PrimeiraCarta.classList.remove("em-jogo");
                setTimeout(VirarCarta, 1500, PrimeiraCarta);
                setTimeout(VirarCarta, 1500, SegundaCarta);

            }
        }
    }

    if (acabou()) {

        clearInterval(stopTimer);
        setTimeout(alert, 1000, `Você ganhou em ${cliques} jogadas!\nTempo total: ${tempo} segundos`);
        setTimeout(jogarNovamente, 1000);    
        
    }
}

// CARTA VIRANDO

function VirarCarta (elemento) {

    elemento.classList.toggle("virada");
    
    let f1 = elemento.querySelector(".face-estatica");
    let f2 = elemento.querySelector(".face-gif");

    f1.classList.toggle("virada");
    f2.classList.toggle("virada");

}

// VERIFICANDO CARTAS IGUAIS

function EhIgual (PrimeiraCarta,SegundaCarta) {

    let cont1 = PrimeiraCarta.innerHTML;
    let cont2 = SegundaCarta.innerHTML;

    if (cont1 === cont2){
        return true;
    } else {
        return false;
    }

}

// FIM DE JOGO

function acabou () {

    let cartasViradas = document.querySelectorAll(".carta.virada").length;

    if (cartasViradas < NumCartas) {
        return false
    } else {
        return true
    }

}

// BÔNUS: JOGAR NOVAMENTE?

function jogarNovamente () {

    novoJogo = prompt ("Deseja jogar novamente? (sim ou não)");

    while (novoJogo !== "sim" && novoJogo !== "não"){
        novoJogo = prompt ("Deseja jogar novamente? (sim ou não)");
    }

    if (novoJogo === "sim"){
        jogo.innerHTML = "";
        tempo = 0;
        cliques = 0
        inicio();
    } else {
        alert("Obrigado por jogar :D")
    }

}

// BÔNUS: CRONÔMETRO

function timer () {

    mostrador = document.querySelector(".cronometro");

    mostrador.innerHTML = `<h2>${tempo}</br>segundos</h2>`;

    stopTimer = setInterval(somarSegundos, 1000);
}

function somarSegundos() {
    tempo++;
    mostrador.innerHTML = `<h2>${tempo}</br>segundos</h2>`;
}

// DISTRIBUIÇÃO DE PAPAGAIOS

function DistPapagaios (NumGifs) {

    let listaGif = [
        "imagens/bobrossparrot.gif",
        "imagens/explodyparrot.gif",
        "imagens/fiestaparrot.gif",
        "imagens/metalparrot.gif",
        "imagens/revertitparrot.gif",
        "imagens/tripletsparrot.gif",
        "imagens/unicornparrot.gif",
    ]
    
    listaGif = listaGif.sort(comparador);

    let output = [];
    for (let i = 0; i < NumGifs; i++){
        output.push(listaGif[i]);
    }

    return (output);
}

// VALIDAR NÚMERO DE CARTAS

function EhValido(num) {

    if (num >= 4 && num <= 14){
        if (num % 2 === 0) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}