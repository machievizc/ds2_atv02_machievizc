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
const curso_entity_1 = require("../entity/curso.entity");
class CursoController {
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cursos = yield typeorm_1.getRepository(curso_entity_1.CursoEntity).find();
                res.send(cursos);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const curso = req.body;
            try {
                yield typeorm_1.getRepository(curso_entity_1.CursoEntity).save(curso);
                //Emitir um sinal para o socket cliente
                req.io.emit("createCurso", curso);
                res.status(201).send(curso);
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
                const curso = yield typeorm_1.getRepository(curso_entity_1.CursoEntity).findOne(id);
                //Se não exnotrar uma curso, devolve erro 404
                if (curso) {
                    res.send(curso);
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
                const curso = yield typeorm_1.getRepository(curso_entity_1.CursoEntity).findOne(id);
                //Se não exnotrar uma curso, devolve erro 404
                if (curso) {
                    //Atualizar o registro
                    yield typeorm_1.getRepository(curso_entity_1.CursoEntity).update(curso.id, novo);
                    //Atualiza o ID do objeto novo
                    novo.id = curso.id;
                    const updated = yield typeorm_1.getRepository(curso_entity_1.CursoEntity).findOne(id);
                    //Emitir um sinal para o socket cliente
                    req.io.emit("updateCurso", updated);
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
                const curso = yield typeorm_1.getRepository(curso_entity_1.CursoEntity).findOne(id);
                //Se não exnotrar uma curso, devolve erro 404
                if (curso) {
                    //Excluir o registro
                    yield typeorm_1.getRepository(curso_entity_1.CursoEntity).delete(curso);
                    //Emitir um sinal para o socket cliente
                    req.io.emit("deleteCurso", curso);
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
exports.default = new CursoController();
//# sourceMappingURL=curso.controller.js.map