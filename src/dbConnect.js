import { MongoClient } from "mongodb";

const cliente = new MongoClient("mongodb+srv://alura:123@aluracluster.jl4qhea.mongodb.net/?retryWrites=true&w=majority");

let documentosColecao;
//Tentar conectar com o banco de dados
try{
    await cliente.connect();

    const db=cliente.db("alurawebsockets");
    documentosColecao = db.collection("documentos");

    console.log("Conectado com sucesso")
}catch(erro){
    console.log(erro);
}

export {documentosColecao}
//vai exportar os arquivos da colecao que se encontram dento do banco de dados do mongoose