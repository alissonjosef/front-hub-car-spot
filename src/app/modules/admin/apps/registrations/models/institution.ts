export interface IInstitution {
  id: number;
  auditCreatedAt: Date;
  auditUpdatedAt: Date;
  auditSystemCreatedBy: number;
  auditSystemUpdatedBy: number;
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
}
