import { emitirAdicionarDocumento } from "./socket-front-index.js";

const listaDocumentos = document.getElementById("lista-documentos");
const form = document.getElementById("form-adiciona-documento");
const inputDocumento = document.getElementById("input-documento");

//Vai pegar o nome do documento que o usuário quer adicionar
form.addEventListener("submit",(evento)=>{
    evento.preventDefault();    
    emitirAdicionarDocumento(inputDocumento.value);
    inputDocumento.value="";
})

//Vai inserir um Documento na página principal
function inserirLinkDocumento(nomeDocumento){
    listaDocumentos.innerHTML += `
    <a href="documento.html?nome=${nomeDocumento}" class="list-group-item list-group-item-action" id="documento-${nomeDocumento}">
        ${nomeDocumento}
    </a>
    `;
}

//Remove o link do documento quando é excluído
function removerLinkDocumento(nomeDocumento){
    const documento = document.getElementById(`documento-${nomeDocumento}`)
    listaDocumentos.removeChild(documento);
}
export {inserirLinkDocumento, removerLinkDocumento};