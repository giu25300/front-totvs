import { BaseEntity } from "../genericos/base-entity";

export class Cliente extends BaseEntity<number>{
  nome?: string;
  endereco?: string;
  bairro?: string;
}
