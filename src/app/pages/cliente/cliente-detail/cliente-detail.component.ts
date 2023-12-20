import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Cliente } from 'src/app/shared/model/entity/cliente';
import { PoNotificationService } from '@po-ui/ng-components';
import { Registro } from 'src/app/shared/model/entity/registro';
import { RegistroService } from 'src/app/shared/services/registro.service';

@Component({
  selector: 'app-cliente-detail',
  templateUrl: './cliente-detail.component.html',
  styleUrls: [],
})
export class ClienteDetailComponent implements OnInit {
  public cliente: Cliente = new Cliente;
  formulario!: FormGroup;
  duracaoMensagemMs: number=5000;

  constructor(
    public poNotification: PoNotificationService,
    private registroService: RegistroService) {}

  ngOnInit(): void {
    console.log('Cliente Detail');
  }

  public validarTelefone(){

  }

  public salvar(){
    let registro=new Registro();
    try {
      this.registroService.inserir(registro);
    }
    catch (error){
      this.poNotification.setDefaultDuration(this.duracaoMensagemMs);
      this.poNotification.error(this.getErrorMessage(error));
    }
  }

  public getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message
    return String(error)
  }
}
