import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { CursoEntity } from "../entity/curso.entity";

class CursoController {
  public async findAll(req: Request, res: Response) {
    try {
      const cursos: CursoEntity[] = await getRepository(
        CursoEntity
      ).find();
      res.send(cursos);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  public async create(req: Request, res: Response) {
    const curso = req.body;

    try {
      await getRepository(CursoEntity).save(curso);

      //Emitir um sinal para o socket cliente
      req.io.emit("createCurso", curso);

      res.status(201).send(curso);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  public async findByID(req: Request, res: Response) {
    const id = req.params.id;

    try {
      //Buscar o registro pela ID
      const curso = await getRepository(CursoEntity).findOne(id);

      //Se não exnotrar uma curso, devolve erro 404
      if (curso) {
        res.send(curso);
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
      const curso = await getRepository(CursoEntity).findOne(id);

      //Se não exnotrar uma curso, devolve erro 404
      if (curso) {
        //Atualizar o registro
        await getRepository(CursoEntity).update(curso.id, novo);

        //Atualiza o ID do objeto novo
        novo.id = curso.id;

        const updated = await getRepository(CursoEntity).findOne(id);

        //Emitir um sinal para o socket cliente
        req.io.emit("updateCurso", updated);

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
      const curso = await getRepository(CursoEntity).findOne(id);

      //Se não exnotrar uma curso, devolve erro 404
      if (curso) {
        //Excluir o registro
        await getRepository(CursoEntity).delete(curso);

        //Emitir um sinal para o socket cliente
        req.io.emit("deleteCurso", curso);

        res.status(204).send();
      } else {
        res.status(404).send({ message: "Record not found" });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

export default new CursoController();
