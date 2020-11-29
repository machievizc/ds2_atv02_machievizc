import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class UsuarioService {

  public url = environment.url;

  constructor(private http: HttpClient) {}

  /**
   * Fornece uma lista com TODOS as usuarios disponíveis
   */
  public listarTodos() {
    return this.http.get(this.url + '/usuarios');
  }

  /**
   * Fornece a usuario com o ID passado por parâmetro
   *
   * @param id
   */
  public listarPorId(id: number) {
    //Assim:
    //  return this.http.get(environment.urlSaaS +'/usuarios/'+ id);
    //... ou, assim:
    return this.http.get(`${this.url}/usuarios/${id}`);
  }

  /**
   * Exclui a usuario com o mesmo ID passado por parâmetro
   *
   * @param id
   */
  public excluir(id: number) {
    return this.http.delete(this.url + '/usuarios/' + id);
  }

  /**
   * Verifica se existe um ID na usuario passada por parametro.
   * Se existir, significa que a usuario deverá ser alterada,
   * caso contrário, significa que a usuario será incluída
   *
   * @param usuario
   */
  public salvar(usuario: UsuarioEntity) {
    if (usuario.id) {
      return this.alterar(usuario);
    } else {
      return this.adicionar(usuario);
    }
  }

  /**
   * Adiciona uma nova usuario
   *
   * @param usuario
   */
  private adicionar(usuario: UsuarioEntity) {
    return this.http.post(this.url + '/usuarios', usuario);
  }

  /**
   * Altera a usuario passada por parâmetro
   *
   * @param usuario
   */
  private alterar(usuario: UsuarioEntity) {
    return this.http.put(this.url + '/usuarios/' + usuario.id, usuario);
  }
}

export class UsuarioEntity {
  id: number;
  nome: string;
  email: string;
  registro: string;
  professor: boolean;
}
