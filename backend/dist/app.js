"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const socket_io_1 = __importDefault(require("socket.io"));
const usuario_router_1 = __importDefault(require("./router/usuario.router"));
const curso_router_1 = __importDefault(require("./router/curso.router"));
const turma_router_1 = __importDefault(require("./router/turma.router"));
const faculdade_router_1 = __importDefault(require("./router/faculdade.router"));
class App {
    constructor() {
        this.express = express_1.default();
        this.middleware();
        this.socket();
        this.routes();
    }
    middleware() {
        this.express.use(express_1.default.json());
        this.express.use(cors_1.default());
    }
    socket() {
        this.server = http_1.createServer(this.express);
        this.io = socket_io_1.default(this.server);
    }
    routes() {
        this.express.use((req, res, next) => {
            req.io = this.io;
            next();
        });
        this.express.use('/usuarios', usuario_router_1.default);
        this.express.use('/cursos', curso_router_1.default);
        this.express.use('/turmas', turma_router_1.default);
        this.express.use('/faculdades', faculdade_router_1.default);
    }
}
exports.App = App;
exports.default = new App();
//# sourceMappingURL=app.js.map