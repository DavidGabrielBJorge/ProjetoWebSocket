import { alertarERedirecionar, atualizaTextoEditor } from "./documento.js";

const socket = io("http://localhost:3000");

//Vai pegar o nome da sala na url, dessa forma as pessoas que estão na sala de "Node" por exemplo
//não tyerão suas conversas em outras salas distintas
function selecionarDocumento(nome){
    socket.emit("selecionar_documento", nome, (texto)=>{
        atualizaTextoEditor(texto)
    });
}

function emitirTextoEditor(dados){
    socket.emit("texto_editor", dados);
}

//Vai atualizar os textos já inseridos no campo de texto
socket.on("texto_documento", (texto)=>{
    atualizaTextoEditor(texto);
})
//Aparece para todos o que o usuário está escrevendo
//socket.on("texto_editor_clientes",(texto) => {
//    atualizaTextoEditor(texto);
//})

//Ao voltar para a tela principal o usuário é desconectado
socket.on("disconnect", (motivo) => {
    console.log(`Servidor desconectado!
    Motivo: ${motivo}`);
  });

//Metodo para excluir um documento
function emitirExcluirDocumento(nome){
    socket.emit("excluir_documento", nome);
}

//Metodo para redirecionar quando exclui um documento
socket.on("excluir_documento_sucesso", (nome)=>{
    alertarERedirecionar(nome);
})
export { emitirTextoEditor, selecionarDocumento, emitirExcluirDocumento };