import  express  from "express";
import url from "url";
import path from "path";
import http from "http";
import { Server } from "socket.io";

import "./dbConnect.js"

const app = express();
const porta = process.env.porta || 3000;

const caminhoAtual = url.fileURLToPath(import.meta.url);

const diretorioPublico = path.join(caminhoAtual, "../..", "public");
//Vai sair da pasta "src" e da pasta raiz

app.use(express.static(diretorioPublico));
//informa que o diretorio publico deve ser usado de forma estatica

const servidorHttp = http.createServer(app);
//criar o servidor

servidorHttp.listen(porta,()=> console.log(`Servidor na porta ${porta}`));

const io = new Server(servidorHttp);
//Fornece métodos do sockets para ser usado no projeto

export default io;