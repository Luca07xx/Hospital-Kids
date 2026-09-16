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