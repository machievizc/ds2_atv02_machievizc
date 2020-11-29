import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { UsuarioEntity } from './usuario.service';

@Injectable({
  providedIn: 'root',
})

export class TurmaService {

  public url = environment.url;

  constructor(private http: HttpClient) {}

  /**
   * Fornece uma lista com TODOS as turmas disponíveis
   */
  public listarTodos() {
    return this.http.get(this.url + '/turmas');
  }

  /**
   * Fornece a turma com o ID passado por parâmetro
   *
   * @param id
   */
  public listarPorId(id: number) {
    //Assim:
    //  return this.http.get(environment.urlSaaS +'/turmas/'+ id);
    //... ou, assim:
    return this.http.get(`${this.url}/turmas/${id}`);
  }

  /**
   * Exclui a turma com o mesmo ID passado por parâmetro
   *
   * @param id
   */
  public excluir(id: number) {
    return this.http.delete(this.url + '/turmas/' + id);
  }

  /**
   * Verifica se existe um ID na turma passada por parametro.
   * Se existir, significa que a turma deverá ser alterada,
   * caso contrário, significa que a turma será incluída
   *
   * @param turma
   */
  public salvar(turma: TurmaEntity) {
    if (turma.id) {
      return this.alterar(turma);
    } else {
      return this.adicionar(turma);
    }
  }

  /**
   * Adiciona uma nova turma
   *
   * @param turma
   */
  private adicionar(turma: TurmaEntity) {
    return this.http.post(this.url + '/turmas', turma);
  }

  /**
   * Altera a turma passada por parâmetro
   *
   * @param turma
   */
  private alterar(turma: TurmaEntity) {
    return this.http.put(this.url + '/turmas/' + turma.id, turma);
  }
}

export class TurmaEntity {
  id: number;
  usuario: UsuarioEntity;
}
