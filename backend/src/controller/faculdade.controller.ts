import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { FaculdadeEntity } from "../entity/faculdade.entity";

class FaculdadeController {
  public async findAll(req: Request, res: Response) {
    try {
      const faculdades: FaculdadeEntity[] = await getRepository(
        FaculdadeEntity
      ).find();
      res.send(faculdades);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  public async create(req: Request, res: Response) {
    const faculdade = req.body;

    try {
      await getRepository(FaculdadeEntity).save(faculdade);

      //Emitir um sinal para o socket cliente
      req.io.emit("createFaculdade", faculdade);

      res.status(201).send(faculdade);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  public async findByID(req: Request, res: Response) {
    const id = req.params.id;

    try {
      //Buscar o registro pela ID
      const faculdade = await getRepository(FaculdadeEntity).findOne(id);

      //Se não exnotrar uma faculdade, devolve erro 404
      if (faculdade) {
        res.send(faculdade);
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
      const faculdade = await getRepository(FaculdadeEntity).findOne(id);

      //Se não exnotrar uma faculdade, devolve erro 404
      if (faculdade) {
        //Atualizar o registro
        await getRepository(FaculdadeEntity).update(faculdade.id, novo);

        //Atualiza o ID do objeto novo
        novo.id = faculdade.id;

        const updated = await getRepository(FaculdadeEntity).findOne(id);

        //Emitir um sinal para o socket cliente
        req.io.emit("updateFaculdade", updated);

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
      const faculdade = await getRepository(FaculdadeEntity).findOne(id);

      //Se não exnotrar uma faculdade, devolve erro 404
      if (faculdade) {
        //Excluir o registro
        await getRepository(FaculdadeEntity).delete(faculdade);

        //Emitir um sinal para o socket cliente
        req.io.emit("deleteFaculdade", faculdade);

        res.status(204).send();
      } else {
        res.status(404).send({ message: "Record not found" });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

export default new FaculdadeController();
