import { adicionarDocumento, atualizaDocumento, encontrarDocumento, excluirDocumento, obterDocumentos } from "./documentosDb.js";
import io from "./servidor.js";
//Nesse arquivo vai informar o ID único de um cilente ao conectar


io.on("connection", (socket)=>{
    //Vai pegar os Documentos salvos no banco de dados
    socket.on("obter_documentos",async (devolverDocumentos) =>{
        const documentos = await obterDocumentos();
        //Dentro da função "obterDocumentos" vai pegar os dados do banco
        devolverDocumentos(documentos);
    })
    console.log("Um cliente se conectou, ID:", socket.id);

    //Metodo para adicionar um novo documento criado pelo usuário
    socket.on("adicionar_documento", async (nome) => {
        //vai conferir se o documento informado pelo usuário já existe no sistema
        const documentoExiste = (await encontrarDocumento(nome)) !== null;
        
        //Se for diferente de null, indica que existe
        if(documentoExiste){
            socket.emit("documento_existente",nome);
        }else{
            const resultado = await adicionarDocumento(nome);

            //Conferir se o objeto inserido não está vazio
            if (resultado.acknowledged) {
                io.emit("adicionar_documento_interface", nome);
              }
        }
        
    });

    //Ao buscar o documento
    socket.on("selecionar_documento", async (nomeDocumento, devolverTexto) =>{
        //para fazer com que o await funcione é preciso colocar a função como assíncrona

        socket.join(nomeDocumento);
        //vai pegar o cliente que está conectado agora no socket e vai colocar em uma sala, com o nomeDocumento
        
        const documento = await encontrarDocumento(nomeDocumento);
        //Como encontrarDocumento é uma promise é preciso usar await para primeiro fazer a busca no banco

        if(documento){
            //socket.emit("texto_documento", documento.texto);
            devolverTexto(documento.texto);
        }
        
    })


    //Nessa função vai emitir o texto que o cliente está escrevendo em uma janela, para que todos que estão logados na mesma janela possam ver
    socket.on("texto_editor", async ({texto, nomeDocumento}) => {
        const atualizacao = await atualizaDocumento(nomeDocumento, texto);
        //Ao encontrar o documento
        if(atualizacao.modifiedCount){
            
            //socket.broadcast.emit("texto_editor_clientes", texto);
            //Mostrar o texto escrito para todos os clientes, menos pra o que está escrevendo o texto
            socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
        }

    });

    socket.on("excluir_documento", async (nome)=>{
        const resultado = await excluirDocumento(nome);
        if(resultado.deletedCount){
            io.emit("excluir_documento_sucesso",nome);
        }
    })

    socket.on("disconnect", (motivo) => {
        console.log(`Cliente "${socket.id}" desconectado!
        Motivo: ${motivo}`);
      });

    
});





