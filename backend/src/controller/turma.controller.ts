import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { TurmaEntity } from "../entity/turma.entity";

class TurmaController {
  public async findAll(req: Request, res: Response) {
    try {
      const cards: TurmaEntity[] = await getRepository(
        TurmaEntity
      ).find();
      res.send(cards);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  public async create(req: Request, res: Response) {
    const card = req.body;

    try {
      await getRepository(TurmaEntity).save(card);

      //Emitir um sinal para o socket cliente
      req.io.emit("createTurma", card);

      res.status(201).send(card);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  public async findByID(req: Request, res: Response) {
    const id = req.params.id;

    try {
      //Buscar o registro pela ID
      const card = await getRepository(TurmaEntity).findOne(id);

      //Se não exnotrar uma card, devolve erro 404
      if (card) {
        res.send(card);
      } else {
        res.status(404).send({ message: "Record not found" });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }

  public async update(req: Request, res: Response) {
    const id = req.params.id;
    const novo = req.body;

    try {
      //Buscar o registro pela ID
      const card = await getRepository(TurmaEntity).findOne(id);

      //Se não exnotrar uma card, devolve erro 404
      if (card) {
        //Atualizar o registro
        await getRepository(TurmaEntity).update(card.id, novo);

        //Atualiza o ID do objeto novo
        novo.id = card.id;

        const updated = await getRepository(TurmaEntity).findOne(id);

        //Emitir um sinal para o socket cliente
        req.io.emit("updateTurma", updated);

        res.send(novo);
      } else {
        res.status(404).send({ message: "Record not found" });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }

  public async delete(req: Request, res: Response) {
    const id = req.params.id;

    try {
      //Buscar o registro pela ID
      const card = await getRepository(TurmaEntity).findOne(id);

      //Se não exnotrar uma card, devolve erro 404
      if (card) {
        //Excluir o registro
        await getRepository(TurmaEntity).delete(card);

        //Emitir um sinal para o socket cliente
        req.io.emit("deleteTurma", card);

        res.status(204).send();
      } else {
        res.status(404).send({ message: "Record not found" });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

export default new TurmaController();
