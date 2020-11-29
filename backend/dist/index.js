"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const app_1 = __importDefault(require("./app"));
const port = 3333;
typeorm_1.createConnection()
    .then((connection) => {
    //Levanta o servidor
    app_1.default.server.listen(port, () => {
        console.log(`Rodando na porta ${port}...`);
    });
})
    .catch((error) => {
    console.log("Não foi possível conecta ao banco de dados.", error.message);
});
//# sourceMappingURL=index.js.map