import { Telefone } from './../model/entity/telefone';
import { Injectable } from '@angular/core';
import { BaseService } from './base-service.service';
import { Registro } from '../model/entity/registro';
import { environment } from 'src/environments/environment';
import { EndPointsEnum } from '../enums/endpoint.enum';
import { HttpClient } from '@angular/common/http';
import { ClienteService } from './cliente.service';
import { TelefoneService } from './telefone.service';

@Injectable({
  providedIn: 'root'
})
export class RegistroService extends BaseService<number, Registro> {
  private PATH = `${environment.api_url}/${EndPointsEnum.CLIENTE}`

  constructor(protected override http:HttpClient,
    private clienteService: ClienteService,
    private telefoneService: TelefoneService) {
    super(http,EndPointsEnum.CLIENTE);
  }

  private validar(registro: Registro): boolean {
    if (registro==null) {
      throw new Error('Registro não definido!');
    }

    this.clienteService.validar(registro.cliente!);
    this.telefoneService.validar(registro.telefone!);

    return true;
  }

  public inserir(registro: Registro){
    this.validar(registro);
    //this.clienteService.inserir(registro!);
  }
}
