const botaoJogar = document.getElementById("btnJogar");

const telaInicial = document.getElementById("telaInicial");

const telaHospital = document.getElementById("telaHospital");

botaoJogar.addEventListener("click", function() {

    telaInicial.style.display = "none";

    telaHospital.style.display = "block";

});
const botaoHigiene = document.getElementById("btnHigiene");

const telaHigiene = document.getElementById("telaHigiene");


botaoHigiene.addEventListener("click", function() {

    telaHospital.style.display = "none";

    telaHigiene.style.display = "block";

});
const botaoComecar = document.getElementById("btnComecar");

const instrucaoHigiene = document.getElementById("instrucaoHigiene");


botaoComecar.addEventListener("click", function() {

    instrucaoHigiene.textContent = "💧 Clique na torneira para começar!";

});
const torneira = document.getElementById("torneira");

torneira.addEventListener("click", function() {

    instrucaoHigiene.textContent = "🧼 Muito bem! Agora coloque sabão nas mãos.";

});
const sabao = document.getElementById("sabao");

torneira.addEventListener("click", function() {

    instrucaoHigiene.textContent = "🧼 Muito bem! Agora coloque sabão nas mãos.";

    sabao.style.display = "block";

});
const personagem = document.getElementById("personagem");

let posicaoX = 50;
let posicaoY = 50;

document.addEventListener("keydown", function(evento) {

    if (evento.key === "ArrowUp") {
        posicaoY -= 3;
    }

    if (evento.key === "ArrowDown") {
        posicaoY += 3;
    }

    if (evento.key === "ArrowLeft") {
        posicaoX -= 3;
    }

    if (evento.key === "ArrowRight") {
        posicaoX += 3;
    }

    // Limites do mapa
    if (posicaoX < 8) {
        posicaoX = 8;
    }

    if (posicaoX > 92) {
        posicaoX = 92;
    }

    if (posicaoY < 15) {
        posicaoY = 15;
    }

    if (posicaoY > 85) {
        posicaoY = 85;
    }

    personagem.style.left = posicaoX + "%";
    personagem.style.top = posicaoY + "%";

});
// ===== JOYSTICK DO CELULAR =====

const joystick = document.getElementById("joystick");
const joystickBotao = document.getElementById("joystickBotao");

let joystickAtivo = false;

joystick.addEventListener("touchstart", function(evento) {
    evento.preventDefault();

    joystickAtivo = true;
});

joystick.addEventListener("touchmove", function(evento) {
    if (!joystickAtivo) return;

    evento.preventDefault();

    const toque = evento.touches[0];

    const area = joystick.getBoundingClientRect();

    const centroX = area.left + area.width / 2;
    const centroY = area.top + area.height / 2;

    let deslocamentoX = toque.clientX - centroX;
    let deslocamentoY = toque.clientY - centroY;

    const distancia = Math.sqrt(
        deslocamentoX * deslocamentoX +
        deslocamentoY * deslocamentoY
    );

    const limite = 35;

    if (distancia > limite) {
        deslocamentoX = deslocamentoX / distancia * limite;
        deslocamentoY = deslocamentoY / distancia * limite;
    }

    joystickBotao.style.transform =
        `translate(${deslocamentoX}px, ${deslocamentoY}px)`;

    posicaoX += deslocamentoX / 100;
    posicaoY += deslocamentoY / 100;

    // Limites do mapa
    posicaoX = Math.max(8, Math.min(92, posicaoX));
    posicaoY = Math.max(15, Math.min(85, posicaoY));

    personagem.style.left = posicaoX + "%";
    personagem.style.top = posicaoY + "%";
});

joystick.addEventListener("touchend", function() {

    joystickAtivo = false;

    joystickBotao.style.transform = "translate(0, 0)";
});