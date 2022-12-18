'user stritc'

const display = document.getElementById("display");
//busca o id cujo um dos elementos tem a palavra "tecla". o mesmo para "operadores"
const numeros = document.querySelectorAll("[id*=tecla]");
const operadores = document.querySelectorAll("[id*=operador]");

let novoNUmero = true;
let operador;
let numeroAnterior;
//verifica se o "operador" é diferente de vazio
const operacaoPendente = () => operador !== undefined;
// primeiro verifica se tem uma "operacaoPendente"se sim ele calcula
const calcular = () => {
    if (operacaoPendente()) {
        // pega o conteudo de texto que é uma string e passa para numero em seguida
        const numeroAtual = parseFloat(display.textContent.replace(",","."));
        novoNUmero = true;
        //pega o "numeroAtual o operador e o numeroAtual faz a conta e "atualiza O display
        const resultado = eval (`${numeroAnterior}${operador}${numeroAtual}`);
        atualizarDisplay(resultado);
    }
}


// pega o id display e adiciona para ele o evento atualizarDisplay,nesse caso cada numero clicado em "inserirNumero" vai atualizar no display
const atualizarDisplay = (texto) => {
    if (novoNUmero){
        display.textContent = texto.toLocaleString("BR");
        novoNUmero = false;
    }else {
        display.textContent += texto.toLocaleString("BR");

    }
}
// pega o evento de inserirNumero ,chama o target para cada numero e pega o conteudo de texto,e adiciona tudo ao "atualizarDisplay"
const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);
//pega a const numeros e adiciona um evento de click em cada numero e em seguida chama a funcao "inserirNumero"
numeros.forEach(numero => numero.addEventListener("click", inserirNumero));

//se nao(!) for um "numero novo quando clicar no selecionarOperador vai criar um novo numero,armazena em "operador" o text content do evento, o mesmo com o "numeroAnterior"
const selecionarOperador = (evento) => {
    if (!novoNUmero){ 
        calcular();
        novoNUmero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent.replace(",","."));
    }
}
// pega a const operadores e nela adiciona um foreach e cada uma das operacoes clicadas adiciona um evento de click em seguida chama a funcao selecionarOperador
operadores.forEach(operador => operador.addEventListener("click", selecionarOperador));

const ativarIgual = () => {
    calcular();
    operador = undefined ;
}
// busca o id "igual"chama o evento de click em seguida chama funcao "ativarIgual"
document.getElementById("igual").addEventListener("click", ativarIgual)
// funcao para limpar o display
const limparDisplay = () => {
    display.textContent = ""
}
document.getElementById("limpardisplay").addEventListener("click", limparDisplay);
// chama o "limparDisplay" e limpa operador novoNumero e numeroAnterior
const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNUmero = true;
    numeroAnterior = undefined;

}
document.getElementById("limparCalculo").addEventListener("click", limparCalculo);

const removerUltimoNumero = () => {
    display.textContent = display.textContent.slice(0, -1);
}
document.getElementById("backspace").addEventListener("click", removerUltimoNumero)

const inverterSinal = () => {
    novoNUmero = true; 
    atualizarDisplay(display.textContent * -1)
}
document.getElementById("inverter").addEventListener("click", inverterSinal)

const existeDecimal = () => display.textContent.indexOf(",") !== -1; 
const existeValor = () => display.textContent.length > 0;

const inserirDecimal = () => {
    if (!existeDecimal()){
        if (existeValor()){
            atualizarDisplay(",");
        }else{
            atualizarDisplay("0,");
        }
    }
}
document.getElementById("decimal").addEventListener("click", inserirDecimal)

const mapaTeclado = {
    "0"         : "tecla0",
    "1"         : "tecla1",
    "2"         : "tecla2",
    "3"         : "tecla3",
    "4"         : "tecla4",
    "5"         : "tecla5",
    "6"         : "tecla6",
    "7"         : "tecla7",
    "8"         : "tecla8",
    "9"         : "tecla9",
    "*"         : "operadorMultiplicar",
    "/"         : "operadorDividir",
    "-"         : "operadorSubtrair",
    "+"         : "operadorAdicionar",
    "="         : "igual",
    "Enter"     : "igual",
    "backspace" : "backspace",
    "c"         : "limpardisplay",
    "Escape"    : "limparCalculo",
    ","         : "decimal",
    
}
const mapearTeclado = (evento) => {
    const tecla = evento.key;

    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;
    
    if (teclaPermitida()){
        document.getElementById(mapaTeclado[tecla]).click();
    }
    
}
document.addEventListener("keydown", mapearTeclado)














