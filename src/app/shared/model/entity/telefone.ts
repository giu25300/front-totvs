import { BaseEntity } from "../genericos/base-entity";

export class Telefone extends BaseEntity<number>{
  numero?: string;
  clienteId?: number;
}
