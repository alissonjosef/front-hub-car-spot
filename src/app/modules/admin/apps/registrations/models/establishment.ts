
export interface IEstablishments {
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  logradouro: string;
  logradouroNumero: string;
  cep: string;
  bairro: string;
  cidade: string;
  codigoIbge: string;
  uf: string;
  nomeResponsavel: string;
  telefone: string;
  email: string;
  id: number;
  auditCreatedAt: Date;
  auditUpdatedAt: Date | null;
  auditSystemCreatedBy: number | null;
  auditSystemUpdatedBy: number | null;
}
