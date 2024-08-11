const textArea = document.querySelector(".text-area");
const mensagem = document.querySelector(".mensagem");
const btnCopiar = document.querySelector(".btn-copiar");
const mensagemCopiado = document.getElementById("mensagem-copiado");

function removerCaracteresEspeciais(texto) {
    return texto
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z\s]/g, ''); 
}

function validarEntrada(event) {
    const textoAtual = event.target.value;
    const textoValido = textoAtual
        .normalize('NFD') 
        .replace(/[\u0300-\u036f]/g, '') 
        .replace(/[^a-z\s]/g, ''); 
    event.target.value = textoValido;
}

textArea.addEventListener('input', validarEntrada);

function btnEncriptar() {
    const textoOriginal = textArea.value;
    const textoFormatado = removerCaracteresEspeciais(textoOriginal);
    const textoEncriptado = encriptar(textoFormatado);
    mensagem.value = textoEncriptado;
    textArea.value = "";
}

function btnDesencriptar() {
    const textoEncriptado = textArea.value;
    const textoDesencriptado = desencriptar(textoEncriptado);
    mensagem.value = textoDesencriptado;
    textArea.value = "";
}

function encriptar(stringEncriptada) {   
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringEncriptada = stringEncriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        stringEncriptada = stringEncriptada.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1]);
    }

    return stringEncriptada;
}

function desencriptar(stringDesencriptada) {   
    let matrizCodigo = [["enter", "e"], ["imes", "i"], ["ai", "a"], ["ober", "o"], ["ufat", "u"]];
    stringDesencriptada = stringDesencriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        stringDesencriptada = stringDesencriptada.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1]);
    }

    return stringDesencriptada;
}

function copiarTexto() {
    mensagem.select();
    document.execCommand("copy");

    mensagemCopiado.style.display = 'block';

    setTimeout(() => {
        mensagemCopiado.style.display = 'none';
    }, 2000);
}

btnCopiar.addEventListener("click", copiarTexto);
