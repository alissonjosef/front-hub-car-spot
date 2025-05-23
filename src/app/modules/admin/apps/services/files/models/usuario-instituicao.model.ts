import { IFilial } from "./filial.model";
import { IInstituicao } from "./intituicao.model";

export interface IUsuarioInstituicao {
  id: string;
  identificador?: string | null;
  isMaster?: boolean | null;
  role?: string | null;
  read?: boolean | null;
  write?: boolean | null;
  update?: boolean | null;
  delete?: boolean | null;
  status?: boolean | null;
  instituicao?: IInstituicao | null;
  filial?: IFilial | null;

}

export type NewUsuarioInstituicao = Omit<IUsuarioInstituicao, 'id'> & { id: null };
