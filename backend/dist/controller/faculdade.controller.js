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
const faculdade_entity_1 = require("../entity/faculdade.entity");
class FaculdadeController {
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const faculdades = yield typeorm_1.getRepository(faculdade_entity_1.FaculdadeEntity).find();
                res.send(faculdades);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const faculdade = req.body;
            try {
                yield typeorm_1.getRepository(faculdade_entity_1.FaculdadeEntity).save(faculdade);
                //Emitir um sinal para o socket cliente
                req.io.emit("createFaculdade", faculdade);
                res.status(201).send(faculdade);
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
                const faculdade = yield typeorm_1.getRepository(faculdade_entity_1.FaculdadeEntity).findOne(id);
                //Se não exnotrar uma faculdade, devolve erro 404
                if (faculdade) {
                    res.send(faculdade);
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
                const faculdade = yield typeorm_1.getRepository(faculdade_entity_1.FaculdadeEntity).findOne(id);
                //Se não exnotrar uma faculdade, devolve erro 404
                if (faculdade) {
                    //Atualizar o registro
                    yield typeorm_1.getRepository(faculdade_entity_1.FaculdadeEntity).update(faculdade.id, novo);
                    //Atualiza o ID do objeto novo
                    novo.id = faculdade.id;
                    const updated = yield typeorm_1.getRepository(faculdade_entity_1.FaculdadeEntity).findOne(id);
                    //Emitir um sinal para o socket cliente
                    req.io.emit("updateFaculdade", updated);
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
                const faculdade = yield typeorm_1.getRepository(faculdade_entity_1.FaculdadeEntity).findOne(id);
                //Se não exnotrar uma faculdade, devolve erro 404
                if (faculdade) {
                    //Excluir o registro
                    yield typeorm_1.getRepository(faculdade_entity_1.FaculdadeEntity).delete(faculdade);
                    //Emitir um sinal para o socket cliente
                    req.io.emit("deleteFaculdade", faculdade);
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
exports.default = new FaculdadeController();
//# sourceMappingURL=faculdade.controller.js.map