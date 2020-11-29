"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_controller_1 = __importDefault(require("../controller/usuario.controller"));
class UsuarioRoute {
    constructor() {
        this.router = express_1.Router();
        //Inicio as rotas de usuario
        this.init();
    }
    init() {
        //Rota raíz
        this.router.route('/')
            .get(usuario_controller_1.default.findAll)
            .post(usuario_controller_1.default.create);
        //Reta para um registro especificado pelo ID
        this.router.route('/:id([0-9]+)')
            .get(usuario_controller_1.default.findByID)
            .put(usuario_controller_1.default.update)
            .delete(usuario_controller_1.default.delete);
    }
}
exports.default = new UsuarioRoute().router;
//# sourceMappingURL=usuario.router.js.map