import { BaseEntity } from "../genericos/base-entity";
import { Cliente } from "./cliente";
import { Telefone } from "./telefone";

export class Registro extends BaseEntity<number> {
  cliente?: Cliente;
  telefone?: Telefone[];
}
