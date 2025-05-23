// src/app/shared/mocks/client.mock.ts ou similar

import { IEstablishments } from "../models/establishment";


export const establishmentsMockData: IEstablishments[] = [{
  cnpj: "86786632000148",
  razaoSocial: "Razao Teste",
  nomeFantasia: "Fantasia Teste",
  logradouro: "Logradouro Teste",
  logradouroNumero: "123",
  cep: "06473073",
  bairro: "Centro",
  cidade: "Barueri",
  codigoIbge: "3505708",
  uf: "SP",
  nomeResponsavel: "Responsavel Teste",
  telefone: "11987654321",
  email: "email@teste.com",
  id: 1,
  auditCreatedAt: new Date(),
  auditUpdatedAt: new Date(),
  auditSystemCreatedBy: null,
  auditSystemUpdatedBy: null
}];
