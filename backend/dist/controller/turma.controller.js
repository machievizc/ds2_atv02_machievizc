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
const turma_entity_1 = require("../entity/turma.entity");
class TurmaController {
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cards = yield typeorm_1.getRepository(turma_entity_1.TurmaEntity).find();
                res.send(cards);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const card = req.body;
            try {
                yield typeorm_1.getRepository(turma_entity_1.TurmaEntity).save(card);
                //Emitir um sinal para o socket cliente
                req.io.emit("createTurma", card);
                res.status(201).send(card);
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
                const card = yield typeorm_1.getRepository(turma_entity_1.TurmaEntity).findOne(id);
                //Se não exnotrar uma card, devolve erro 404
                if (card) {
                    res.send(card);
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
                const card = yield typeorm_1.getRepository(turma_entity_1.TurmaEntity).findOne(id);
                //Se não exnotrar uma card, devolve erro 404
                if (card) {
                    //Atualizar o registro
                    yield typeorm_1.getRepository(turma_entity_1.TurmaEntity).update(card.id, novo);
                    //Atualiza o ID do objeto novo
                    novo.id = card.id;
                    const updated = yield typeorm_1.getRepository(turma_entity_1.TurmaEntity).findOne(id);
                    //Emitir um sinal para o socket cliente
                    req.io.emit("updateTurma", updated);
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
                const card = yield typeorm_1.getRepository(turma_entity_1.TurmaEntity).findOne(id);
                //Se não exnotrar uma card, devolve erro 404
                if (card) {
                    //Excluir o registro
                    yield typeorm_1.getRepository(turma_entity_1.TurmaEntity).delete(card);
                    //Emitir um sinal para o socket cliente
                    req.io.emit("deleteTurma", card);
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
exports.default = new TurmaController();
//# sourceMappingURL=turma.controller.js.map