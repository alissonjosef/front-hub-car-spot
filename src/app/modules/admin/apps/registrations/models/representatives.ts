import { Moment } from "moment";
export interface Cargo {
  id?: number;
  dsCargo?: string;
  nmCargo?: string;
}
export interface IRepresentatives {
  id?: number;
  refCodInstPagamento?: number;
  nmResponsavel?: string;
  codTipo?: number;
  codCpf?: string;
  codDddTelefone?: string;
  codRamal?: string;
  dsEmail?: string;
  refCodUsuarioCadastro?: number;
  dtCadastro?: Moment;
  refCodUsuarioAlteracao?: number;
  dtAlteracao?: Moment;
  dtInicioVigencia?: Moment;
  dtFimVigencia?: Moment;
  codCargo?: Cargo;
}
