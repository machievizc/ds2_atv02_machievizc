"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const usuario_entity_1 = require("../entity/usuario.entity");
class UsuarioController {
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuarios = yield typeorm_1.getRepository(usuario_entity_1.UsuarioEntity).find();
                res.send(usuarios);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = req.body;
            try {
                yield typeorm_1.getRepository(usuario_entity_1.UsuarioEntity).save(usuario);
                //Emitir um sinal para o socket cliente
                req.io.emit("createUsuario", usuario);
                res.status(201).send(usuario);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    findByID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                //Buscar o registro pela ID
                const usuario = yield typeorm_1.getRepository(usuario_entity_1.UsuarioEntity).findOne(id);
                //Se não exnotrar uma usuario, devolve erro 404
                if (usuario) {
                    res.send(usuario);
                }
                else {
                    res.status(404).send({ message: "Record not found" });
                }
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const novo = req.body;
            try {
                //Buscar o registro pela ID
                const usuario = yield typeorm_1.getRepository(usuario_entity_1.UsuarioEntity).findOne(id);
                //Se não exnotrar uma usuario, devolve erro 404
                if (usuario) {
                    //Atualizar o registro
                    yield typeorm_1.getRepository(usuario_entity_1.UsuarioEntity).update(usuario.id, novo);
                    //Atualiza o ID do objeto novo
                    novo.id = usuario.id;
                    const updated = yield typeorm_1.getRepository(usuario_entity_1.UsuarioEntity).findOne(id);
                    //Emitir um sinal para o socket cliente
                    req.io.emit("updateUsuario", updated);
                    res.send(novo);
                }
                else {
                    res.status(404).send({ message: "Record not found" });
                }
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                //Buscar o registro pela ID
                const usuario = yield typeorm_1.getRepository(usuario_entity_1.UsuarioEntity).findOne(id);
                //Se não exnotrar uma usuario, devolve erro 404
                if (usuario) {
                    //Excluir o registro
                    yield typeorm_1.getRepository(usuario_entity_1.UsuarioEntity).delete(usuario);
                    //Emitir um sinal para o socket cliente
                    req.io.emit("deleteUsuario", usuario);
                    res.status(204).send();
                }
                else {
                    res.status(404).send({ message: "Record not found" });
                }
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
}
exports.default = new UsuarioController();
//# sourceMappingURL=usuario.controller.js.map