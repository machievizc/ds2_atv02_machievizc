"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const faculdade_controller_1 = __importDefault(require("../controller/faculdade.controller"));
class FaculdadeRoute {
    constructor() {
        this.router = express_1.Router();
        //Inicio as rotas de faculdade
        this.init();
    }
    init() {
        //Rota raíz
        this.router.route('/')
            .get(faculdade_controller_1.default.findAll)
            .post(faculdade_controller_1.default.create);
        //Reta para um registro especificado pelo ID
        this.router.route('/:id([0-9]+)')
            .get(faculdade_controller_1.default.findByID)
            .put(faculdade_controller_1.default.update)
            .delete(faculdade_controller_1.default.delete);
    }
}
exports.default = new FaculdadeRoute().router;
//# sourceMappingURL=faculdade.router.js.map