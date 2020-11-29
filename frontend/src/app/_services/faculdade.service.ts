import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { CursoEntity } from './curso.service';

@Injectable({
  providedIn: 'root',
})

export class FaculdadeService {

  public url = environment.url;

  constructor(private http: HttpClient) {}

  /**
   * Fornece uma lista com TODOS as faculdades disponíveis
   */
  public listarTodos() {
    return this.http.get(this.url + '/faculdades');
  }

  /**
   * Fornece a faculdade com o ID passado por parâmetro
   *
   * @param id
   */
  public listarPorId(id: number) {
    //Assim:
    //  return this.http.get(environment.urlSaaS +'/faculdades/'+ id);
    //... ou, assim:
    return this.http.get(`${this.url}/faculdades/${id}`);
  }

  /**
   * Exclui a faculdade com o mesmo ID passado por parâmetro
   *
   * @param id
   */
  public excluir(id: number) {
    return this.http.delete(this.url + '/faculdades/' + id);
  }

  /**
   * Verifica se existe um ID na faculdade passada por parametro.
   * Se existir, significa que a faculdade deverá ser alterada,
   * caso contrário, significa que a faculdade será incluída
   *
   * @param faculdade
   */
  public salvar(faculdade: FaculdadeEntity) {
    if (faculdade.id) {
      return this.alterar(faculdade);
    } else {
      return this.adicionar(faculdade);
    }
  }

  /**
   * Adiciona uma nova faculdade
   *
   * @param faculdade
   */
  private adicionar(faculdade: FaculdadeEntity) {
    return this.http.post(this.url + '/faculdades', faculdade);
  }

  /**
   * Altera a faculdade passada por parâmetro
   *
   * @param faculdade
   */
  private alterar(faculdade: FaculdadeEntity) {
    return this.http.put(this.url + '/faculdades/' + faculdade.id, faculdade);
  }
}

export class FaculdadeEntity {
  id: number;
  nome: string;
  curso: CursoEntity;
}
