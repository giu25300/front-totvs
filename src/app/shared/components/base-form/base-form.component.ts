import { switchMap, debounce, distinctUntilChanged } from "rxjs/operators";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup
} from "@angular/forms";
import { Observable, interval, EMPTY } from "rxjs";
import { FormService } from "../../services/form.service";
import { RxFormBuilder } from "@rxweb/reactive-form-validators";
export abstract class BaseFormComponent {
  protected builder: FormBuilder = new FormBuilder();
  protected rxFormBuilder: RxFormBuilder = new RxFormBuilder();
  protected valueChanged: boolean = false;
  private _fields = [];

  formulario: FormGroup;

  constructor(formService: FormService) {
    this.buildForm();
    formService.emitChange(this.formulario);
  }

  /**
   *
   * Método chamado quando formulario válido é submetido.
   */
  abstract submit(value?: any);
  /**
   * Sempre usar o metodo onSubmit no evento de submit do formulário
   * Ex: <form (submit)="onSubmit()">...</form>
   */
  onSubmit(value?: any) {
    this._fields = [];
    if (this.formulario.valid) {
      this.submit(value);
    } else {
      this.verificaValidacoesForm(this.formulario);
      this.onFormInvalid(this._fields);
    }
  }

  /**
   * Método chamado quando o formulário está inválido.
   */
  abstract onFormInvalid(fields?: Array<any>);

  private buildForm() {
    this.formulario = this.builder.group({
      id: []
    });
  }
  /**
   * Retorna o valor do formControl ou o proprio formControl
   * @param controlPath path do controle no formulário,caso nao seja informado
   * sera retornado o proprio formulario
   * @param control Opcional (TRUE | FALSE - default) Quando true, retorna o FormControl, indicado
   * no parametro {{controlPath}}
   */
  formValue(controlPath?: string, control?: boolean) {
    return controlPath === undefined
      ? control
        ? this.formulario
        : this.formulario.value
      : control
      ? this.formulario.get(controlPath)
      : this.formulario.get(controlPath).value;
  }
  teveCadastro() {
    return this.formulario.get("usuarioCadastrante").get("id").value;
  }
  teveAlteracao() {
    return this.formulario.get("usuarioAlteracao").get("id").value;
  }

  capitalizeFirstLetter = ([first, ...rest], locale = navigator.language) =>
    first.toLocaleUpperCase(locale) + rest.join("");

  /**
   * Devolve o FormControl
   */
  getControl(path: string): AbstractControl {
    return this.formulario.get(path);
  }
  /**
   * @param path
   * @param observable
   */
  onStatusChanged(path: string, observable: Observable<any>) {
    let fc = path.slice(0, path.indexOf("."));
    return this.formValue(path, true)
      .statusChanges.pipe(
        distinctUntilChanged(),
        debounce(() => interval(1500)),
        switchMap((status: any) => (status === "VALID" ? observable : EMPTY))
      )
      .subscribe(
        (result: any) => {
          result ? this.atualizaForm(result, fc) : EMPTY;
        },
        (error: { message: string }) => console.log(error.message)
      );
  }
  /**
   * Adiciona FormControls ao Formulário
   * @param name
   * @param control
   */
  adicionaControle(name: string, control: FormControl | FormArray | FormGroup) {
    this.formulario.addControl(name, control);
  }
  /**
   * Remove FormControls do Formulário
   * @param name
   * @param control
   */
  removeControl(name: string) {
    this.formulario.removeControl(name);
  }

  /**
   *
   * @param obj
   * @param controlPath
   */
  private atualizaForm(obj: any, controlPath?: any) {
    if (controlPath) {
      this.formValue(controlPath, true).patchValue(obj);
    } else {
      this.formValue(undefined, true).patchValue(obj);
    }
  }

  atualizaFormulario(obj: Object, path?: string) {
    if (path) this.formValue(path, true).patchValue(obj);
    else this.formValue(undefined, true).patchValue(obj);
  }

  verificaValidacoesForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach((campo) => {
      const controle = formGroup.get(campo);
      controle.markAsDirty();
      controle.markAsTouched();
      const value = controle.value;
      controle.setValue(value);
      if (controle.invalid) {
        let campoParse : any = campo.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
        this._fields.push({ field: this.capitalizeFirstLetter(campoParse), erro: controle.errors });
      }
      if (controle instanceof FormGroup || controle instanceof FormArray) {
        this.verificaValidacoesForm(controle);
      }
    });
  }
}
