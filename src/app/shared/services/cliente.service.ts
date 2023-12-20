import { Injectable } from '@angular/core';
import { Cliente } from '../model/entity/cliente';
import { environment } from 'src/environments/environment';
import { EndPointsEnum } from '../enums/endpoint.enum';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base-service.service';
import { Registro } from '../model/entity/registro';
import { RegistroService } from './registro.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends BaseService<number, Cliente>{
  private PATH = `${environment.api_url}/${EndPointsEnum.CLIENTE}`

  constructor(protected override http:HttpClient) {
    super(http,EndPointsEnum.CLIENTE)
  }

  public validar(cliente: Cliente): boolean {
    if (cliente==null) {
      throw new Error('Cliente não informado!');
    }
    if (cliente?.nome!=null && cliente?.nome.length>10) {
      throw new Error('O nome não pode ter mais que 10 caracteres!');
    }
    if (cliente?.endereco!=null && cliente?.endereco.length>100) {
      throw new Error('O nome não pode ter mais que 100 caracteres!');
    }
    if (cliente?.bairro!=null && cliente?.bairro.length>100) {
      throw new Error('O nome não pode ter mais que 100 caracteres!');
    }
    if (cliente?.endereco==cliente?.bairro) {
      throw new Error('Endereco e bairro não podem ser iguais');
    }

    return true;
  }
}
