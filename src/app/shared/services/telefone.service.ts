import { Injectable } from '@angular/core';
import { Telefone } from '../model/entity/telefone';
import { BaseService } from './base-service.service';
import { EndPointsEnum } from '../enums/endpoint.enum';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TelefoneService extends BaseService<number, Telefone> {
  private PATH = `${environment.api_url}/${EndPointsEnum.TELEFONE}`

  constructor(protected override http:HttpClient) {
    super(http,EndPointsEnum.TELEFONE)
  }

  public buscarPeloNumero(numero: String): Observable<Telefone[]>{
    return this.http.get<Telefone[]>(`${environment.api_url}/buscarpelonumero/${numero}`);
  }

  public validar(listaTelefone: Telefone[]): boolean{
    if (listaTelefone==null || listaTelefone.length==0) {
      throw new Error('Nenhum telefone foi informado');
    }
    listaTelefone.forEach(t=> {
      if (t.numero!=null && (t.numero?.length<11 || t.numero?.length>12) ) {
        throw new Error('Número ${t.numero?} inválido!');
      }
    });

    return true;
  }
}
