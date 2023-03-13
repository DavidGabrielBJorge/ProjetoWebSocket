import { inserirLinkDocumento, removerLinkDocumento } from "./index.js";

const socket = io();
//Vai pegar o nome de cada documento para exibir na tela inicial
socket.emit("obter_documentos", (documentos)=>{
    documentos.forEach((documento)=>{
        inserirLinkDocumento(documento.nome)
    })
});

//Vai adicionar o documento criado pelo usuário
function emitirAdicionarDocumento(nome){
    socket.emit("adicionar_documento",nome);
}

socket.on("adicionar_documento_interface",(nome)=>{
    inserirLinkDocumento(nome);
})

socket.on("documento_existente",(nome)=>{
    alert(`O documento ${nome} já existe!`)
})

socket.on("excluir_documento_sucesso", (nome)=>{
    removerLinkDocumento(nome);
})
export {emitirAdicionarDocumento}