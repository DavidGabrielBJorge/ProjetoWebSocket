//Nesse arquivo vou interagir com os elementos do HTML

import { emitirExcluirDocumento, emitirTextoEditor, selecionarDocumento } from "./socket-front-documento.js";

const parametros = new URLSearchParams(window.location.search);
//pegar os parametros da url, para pegar o nome da sala

const nomeDocumento = parametros.get("nome");
//http://localhost:3000/documento.html?nome=JavaScript no caso o nome recebe "JavaScript"

const textoEditor = document.getElementById("editor-texto");
const tituloDocumento = document.getElementById("titulo-documento");
const botaoExcluir = document.getElementById("excluir-documento");

tituloDocumento.textContent = nomeDocumento || "Documento sem título";
//Vai exibir no tutulo da pagina o nome da sala

selecionarDocumento(nomeDocumento);


//Evento quando alguém solta uma tecla
textoEditor.addEventListener("keyup", () =>{
    emitirTextoEditor({
         texto: textoEditor.value,
         nomeDocumento
        });
    //Vai emitir um evento ao soltar a tecla
})

function atualizaTextoEditor(texto){
    textoEditor.value = texto;
}

botaoExcluir.addEventListener("click", ()=>{
    emitirExcluirDocumento(nomeDocumento);
})
//Ao excluir vai mostrar um alert e vai redirecionar para a página inicial
function alertarERedirecionar(nome){
    if(nome === nomeDocumento){
        alert(`Documento ${nome} excluído`);
        window.location.href="/"
    }
    
}
export {atualizaTextoEditor, alertarERedirecionar};