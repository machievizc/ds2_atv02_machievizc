import { createConnection } from "typeorm";
import app from "./app";
import socketIO from "socket.io";
import http from "http";

const port = 3333;

createConnection()
  .then((connection) => {
    //Levanta o servidor
    app.server.listen(port, () => {
      console.log(`Rodando na porta ${port}...`);
    });
  })
  .catch((error) => {
    console.log("Não foi possível conecta ao banco de dados.", error.message);
  });
