import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { TurmaEntity } from './turma.service';

@Injectable({
  providedIn: 'root',
})

export class CursoService {

  public url = environment.url;

  constructor(private http: HttpClient) {}

  /**
   * Fornece uma lista com TODOS as cursos disponíveis
   */
  public listarTodos() {
    return this.http.get(this.url + '/cursos');
  }

  /**
   * Fornece a curso com o ID passado por parâmetro
   *
   * @param id
   */
  public listarPorId(id: number) {
    //Assim:
    //  return this.http.get(environment.urlSaaS +'/cursos/'+ id);
    //... ou, assim:
    return this.http.get(`${this.url}/cursos/${id}`);
  }

  /**
   * Exclui a curso com o mesmo ID passado por parâmetro
   *
   * @param id
   */
  public excluir(id: number) {
    return this.http.delete(this.url + '/cursos/' + id);
  }

  /**
   * Verifica se existe um ID na curso passada por parametro.
   * Se existir, significa que a curso deverá ser alterada,
   * caso contrário, significa que a curso será incluída
   *
   * @param curso
   */
  public salvar(curso: CursoEntity) {
    if (curso.id) {
      return this.alterar(curso);
    } else {
      return this.adicionar(curso);
    }
  }

  /**
   * Adiciona uma nova curso
   *
   * @param curso
   */
  private adicionar(curso: CursoEntity) {
    return this.http.post(this.url + '/cursos', curso);
  }

  /**
   * Altera a curso passada por parâmetro
   *
   * @param curso
   */
  private alterar(curso: CursoEntity) {
    return this.http.put(this.url + '/cursos/' + curso.id, curso);
  }
}

export class CursoEntity {
  id: number;
  nome: string;
  turma: TurmaEntity;
}
