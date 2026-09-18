// ==============================
// TELAS
// ==============================

const telaInicial = document.getElementById("telaInicial");
const telaHospital = document.getElementById("telaHospital");
const telaHigiene = document.getElementById("telaHigiene");
const btnUsarPia =
    document.getElementById("btnUsarPia");


// ==============================
// PERSONAGEM
// ==============================

const personagem = document.getElementById("personagem");

const localPersonagemHigiene =
    document.getElementById("localPersonagemHigiene");

const mapa =
    document.querySelector(".hospital-mapa");

let posicaoX = 50;
let posicaoY = 50;

let posicaoHigiene = 5;


// ==============================
// JOGADOR
// ==============================

let xp = 0;
let estrelas = 0;

const textoXP = document.getElementById("xp");
const textoEstrelas = document.getElementById("estrelas");

function ganharXP(valor) {
    xp += valor;

    if (xp >= 100) {
        xp -= 100;
    }

    textoXP.textContent = xp;
}

function ganharEstrela() {
    estrelas++;
    textoEstrelas.textContent = estrelas;
}


// ==============================
// BOTÃO JOGAR
// ==============================

document
    .getElementById("btnJogar")
    .addEventListener("click", function() {

        telaInicial.style.display = "none";
        telaHospital.style.display = "block";

    });


// ==============================
// ELEMENTOS
// ==============================

const salaHigiene =
    document.getElementById("btnHigiene");

const interacao =
    document.getElementById("interacao");


// ==============================
// ENTRAR NA SALA
// ==============================

function entrarNaSala() {

    telaHospital.style.display = "none";
    telaHigiene.style.display = "block";

    // Coloca o MESMO personagem dentro da sala
    localPersonagemHigiene.appendChild(personagem);

    // Posição inicial dentro da sala
    posicaoHigiene = 5;

    personagem.style.left = posicaoHigiene + "%";
    personagem.style.top = "auto";
    personagem.style.bottom = "90px";

    interacao.style.display = "none";
}


// Clique diretamente na sala
salaHigiene.addEventListener(
    "click",
    entrarNaSala
);


// ==============================
// MOVIMENTO DO PERSONAGEM
// ==============================

document.addEventListener(
    "keydown",
    function(evento) {


        // ==========================
        // MAPA DO HOSPITAL
        // ==========================

        if (telaHospital.style.display === "block") {

            let andando = false;


            if (evento.key === "ArrowUp") {
                posicaoY -= 3;
                andando = true;
            }

            if (evento.key === "ArrowDown") {
                posicaoY += 3;
                andando = true;
            }

            if (evento.key === "ArrowLeft") {
                posicaoX -= 3;
                andando = true;
            }

            if (evento.key === "ArrowRight") {
                posicaoX += 3;
                andando = true;
            }


            if (!andando) {
                return;
            }


            posicaoX =
                Math.max(8, Math.min(92, posicaoX));

            posicaoY =
                Math.max(15, Math.min(85, posicaoY));


            personagem.style.left =
                posicaoX + "%";

            personagem.style.top =
                posicaoY + "%";


            verificarProximidade();

            return;
        }


        // ==========================
        // SALA DE HIGIENE
        // ==========================

        if (telaHigiene.style.display === "block") {


            if (evento.key === "ArrowLeft") {

                posicaoHigiene -= 3;

            }


            if (evento.key === "ArrowRight") {

                posicaoHigiene += 3;

            }


            // Limites
            posicaoHigiene =
                Math.max(
                    3,
                    Math.min(92, posicaoHigiene)
                );


            personagem.style.left =
                posicaoHigiene + "%";


            verificarPia();

        }

    }
);


// ==============================
// PROXIMIDADE DA SALA
// ==============================

function verificarProximidade() {

    const personagemRect =
        personagem.getBoundingClientRect();

    const salaRect =
        salaHigiene.getBoundingClientRect();


    const personagemX =
        personagemRect.left +
        personagemRect.width / 2;

    const personagemY =
        personagemRect.top +
        personagemRect.height / 2;


    const salaX =
        salaRect.left +
        salaRect.width / 2;

    const salaY =
        salaRect.top +
        salaRect.height / 2;


    const distancia =
        Math.sqrt(

            Math.pow(
                personagemX - salaX,
                2
            )

            +

            Math.pow(
                personagemY - salaY,
                2
            )

        );


    if (distancia < 220) {

        interacao.textContent = "ENTRAR";

        interacao.style.display = "block";

    } else {

        interacao.style.display = "none";

    }

}


// ==============================
// PROXIMIDADE DA PIA
// ==============================

function verificarPia() {

    if (
        posicaoHigiene >= 40 &&
        posicaoHigiene <= 60
    ) {

        btnUsarPia.style.display = "block";

    } else {

        btnUsarPia.style.display = "none";

    }
}


// ==============================
// BOTÃO DE INTERAÇÃO
// ==============================

interacao.addEventListener(
    "click",
    function() {

        // Se estiver no mapa
        if (telaHospital.style.display === "block") {

            entrarNaSala();

            return;
        }


        // Se estiver na sala
        if (telaHigiene.style.display === "block") {

            if (
                posicaoHigiene >= 40 &&
                posicaoHigiene <= 60
            ) {

                interacao.style.display = "none";

                instrucao.textContent =
                    "Você está na pia. Comece o desafio!";

            }

        }

    }
);


// ==============================
// MINIGAME
// ==============================

const botaoComecar =
    document.getElementById("btnComecar");

const instrucao =
    document.getElementById("instrucaoHigiene");

const torneira =
    document.getElementById("torneira");

const sabao =
    document.getElementById("sabao");

const maos =
    document.querySelector(".maos");

const progresso =
    document.getElementById("progresso");

const barra =
    document.querySelector(".barra-progresso");

const agua =
    document.querySelector(".agua");


let etapa = 0;
let progressoAtual = 0;


// ==============================
// COMEÇAR DESAFIO
// ==============================

botaoComecar.addEventListener(
    "click",
    function() {

        etapa = 1;

        progressoAtual = 0;

        progresso.style.width = "0%";

        instrucao.textContent =
            "Abra a torneira.";

    }
);


// ==============================
// TORNEIRA
// ==============================

torneira.addEventListener(
    "click",
    function() {

        if (etapa === 1) {

            etapa = 2;

            agua.classList.add("correndo");

            sabao.style.display = "block";

            instrucao.textContent =
                "Pegue o sabonete.";

            return;
        }


        if (etapa === 4) {

            etapa = 5;

            agua.classList.remove("correndo");

            progresso.style.width = "100%";

            instrucao.textContent =
                "Desafio concluído!";

            ganharXP(100);

            ganharEstrela();

        }

    }
);


// ==============================
// SABÃO
// ==============================

sabao.addEventListener(
    "click",
    function() {

        if (etapa !== 2) {
            return;
        }


        etapa = 3;

        sabao.style.display = "none";

        barra.style.display = "block";

        maos.classList.add("esfregando");

        instrucao.textContent =
            "Esfregue as mãos.";

    }
);


// ==============================
// MÃOS
// ==============================

maos.addEventListener(
    "click",
    function() {

        if (etapa !== 3) {
            return;
        }


        progressoAtual += 10;


        progresso.style.width =
            progressoAtual + "%";


        if (progressoAtual >= 100) {

            progressoAtual = 100;

            etapa = 4;

            maos.classList.remove(
                "esfregando"
            );

            instrucao.textContent =
                "Agora enxágue as mãos.";

        }

    }
);

//USAR A PIA 
btnUsarPia.addEventListener("click", function() {

    btnUsarPia.style.display = "none";

    instrucao.textContent =
        "Você chegou à pia! Comece o desafio.";

});
// ==============================
// JOYSTICK DO CELULAR
// ==============================

const joystick = document.getElementById("joystick");
const joystickBotao = document.getElementById("joystickBotao");

let joystickAtivo = false;

joystick.addEventListener("touchstart", function(evento) {

    evento.preventDefault();

    joystickAtivo = true;

}, { passive: false });


joystick.addEventListener("touchmove", function(evento) {

    evento.preventDefault();

    if (!joystickAtivo) {
        return;
    }

    const toque = evento.touches[0];

    const rect =
        joystick.getBoundingClientRect();

    const centroX =
        rect.left + rect.width / 2;

    const centroY =
        rect.top + rect.height / 2;

    const distanciaX =
        toque.clientX - centroX;

    const distanciaY =
        toque.clientY - centroY;


    // Movimento para esquerda/direita
    if (Math.abs(distanciaX) > 10) {

        if (distanciaX > 0) {

            moverDireita();

        } else {

            moverEsquerda();

        }

    }


    // Movimento para cima/baixo no hospital
    if (
        telaHospital.style.display === "block" &&
        Math.abs(distanciaY) > 10
    ) {

        if (distanciaY > 0) {

            moverBaixo();

        } else {

            moverCima();

        }

    }

}, { passive: false });


joystick.addEventListener("touchend", function(evento) {

    evento.preventDefault();

    joystickAtivo = false;

}, { passive: false });


// ==============================
// FUNÇÕES DE MOVIMENTO
// ==============================

function moverEsquerda() {

    if (telaHospital.style.display === "block") {

        posicaoX -= 2;

        posicaoX =
            Math.max(8, Math.min(92, posicaoX));

        personagem.style.left =
            posicaoX + "%";

        verificarProximidade();

        return;
    }


    if (telaHigiene.style.display === "block") {

        posicaoHigiene -= 2;

        posicaoHigiene =
            Math.max(3, Math.min(92, posicaoHigiene));

        personagem.style.left =
            posicaoHigiene + "%";

        verificarPia();
    }
}


function moverDireita() {

    if (telaHospital.style.display === "block") {

        posicaoX += 2;

        posicaoX =
            Math.max(8, Math.min(92, posicaoX));

        personagem.style.left =
            posicaoX + "%";

        verificarProximidade();

        return;
    }


    if (telaHigiene.style.display === "block") {

        posicaoHigiene += 2;

        posicaoHigiene =
            Math.max(3, Math.min(92, posicaoHigiene));

        personagem.style.left =
            posicaoHigiene + "%";

        verificarPia();
    }
}


function moverCima() {

    posicaoY -= 2;

    posicaoY =
        Math.max(15, Math.min(85, posicaoY));

    personagem.style.top =
        posicaoY + "%";

    verificarProximidade();
}


function moverBaixo() {

    posicaoY += 2;

    posicaoY =
        Math.max(15, Math.min(85, posicaoY));

    personagem.style.top =
        posicaoY + "%";

    verificarProximidade();
}