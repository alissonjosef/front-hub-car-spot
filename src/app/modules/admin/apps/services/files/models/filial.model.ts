import { IInstituicao } from "./intituicao.model";

export interface IFilial {
  id: string;
  nome?: string | null;
  telefone?: string | null;
  cnpj?: string | null;
  cep?: string | null;
  endereco?: string | null;
  bairro?: string | null;
  cidade?: string | null;
  numero?: string | null;
  uf?: string | null;
  instituicao?: IInstituicao | null;
}

export type NewFilial = Omit<IFilial, 'id'> & { id: null };