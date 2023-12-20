import { BaseEntity } from '../model/genericos/base-entity';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Page } from '../model/genericos/page';

/**
 * @param K - Tipo chave primária
 * @param T - Tipo Entidade
 */
export class BaseService<K, T extends BaseEntity<K>> {
  private _refresh$ = new Subject<T>();
  /**
   *
   * @param http : HttpClient
   * @param layout Tipo de layout do environment
   */
  constructor(protected http: HttpClient, private endpoint: string) {}

  get refresh() {
    return this._refresh$;
  }

  /**
   * Lista os Layout´s
   */
  listar() {
    return this.http.get<T[]>(`${environment.api_url}/${this.endpoint}/listar/todos`);
    // .pipe(tap(() => this._refresh$.next()));
  }
  /**
   * Consulta Paginada
   * @param page Número da página default 0
   * @param searchBy pesquisar por...
   * @param orderBy Coluna a ser ordenada default id, as colunas
   * são correspondentes ao nomes dos atributos da classe
   * @param dir Direção ordenamento ASC | DESC default ASC
   */
  paginado(
    page: number = 0,
    searchBy?: string,
    orderBy?: string,
    dir?: string,
    size:number = 10,
  ) {
    return this.http.get<Page<T>>(
      `${environment.api_url}/${this.endpoint}/?page=${page}&size=${size}&search=${
        searchBy || ""
      }&sort=${orderBy || "id"},${dir || "asc"}`
    );
  }

  /**
   * Busca layout pelo ID
   * @param id
   */
  buscarPorId(id: K, showLoader:boolean = true) {
    return this.http
      .get<T>(`${environment.api_url}/${this.endpoint}/${id}?loader=${showLoader}`);
  }

 /**
  * Salva ou atualiza a entidade
  * @param obj Entidade a ser persistida
  * @param showLoader Exibir loader default true
  * @param emitirEvento Emitir evento de notificaçao default true
  * @returns T
  */
  salvar(obj: T, showLoader:boolean = true , emitirEvento =  true) {
    if (obj.id) {
      return this.atualizar(obj, showLoader,emitirEvento);
    }
    return this.gravar(obj,showLoader,emitirEvento);
  }

  /*excluir(id: K) {
    return this.http
      .delete(`${environment.api_url}/${this.endpoint}/${id}`)
      .pipe(
        tap(() => console.log(`Apagando objeto ID ${id}`)),
        take(1),
        tap(() => this._refresh$.next())
      );
  }*/

  private atualizar(obj: T,showLoader:boolean = true , emitirEvento =  true) {
    return this.http
      .put<T>(`${environment.api_url}/${this.endpoint}?loader=${showLoader}`, obj)
      .pipe(
        tap(() => console.log(`Atualizando objeto ${obj.id}`)),
        tap(() => emitirEvento ? this._refresh$.next(obj):console.log("Atualização sem evento emitido")),
        //take(1)
      );
  }
  private gravar(obj: T, showLoader:boolean = true, emitirEvento =  true) {
    return this.http
      .post<T>(`${environment.api_url}/${this.endpoint}?loader=${showLoader}`, obj)
      .pipe(
        tap(() => console.log(`Inserindo objeto ${JSON.stringify(obj)}`)),
        //take(1),
        tap(() => emitirEvento ? this._refresh$.next(obj):console.log("Cadastro sem evento emitido")),
      );
  }
}
