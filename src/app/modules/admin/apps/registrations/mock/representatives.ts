import moment from "moment";
import { IRepresentatives } from "../models/representatives";


export const representativesMockData: IRepresentatives[] = [
  {
    id: 107,
    refCodInstPagamento: 2,
    nmResponsavel: "José Maria da Rosa",
    codTipo: 1,
    codCpf: "***740123**",
    codDddTelefone: "23845744 ",
    codRamal: "5743",
    dsEmail: "jose.rosa@sumup.com.br",
    dtAlteracao: null,
    dtCadastro: moment("2022-01-25T15:44:00Z"),
    dtFimVigencia: null,
    dtInicioVigencia: moment("2025-04-25T21:39:08.650Z"),
    codCargo: {
      id: 2,
      dsCargo: "T",
      nmCargo: "Técnico"
    }
  },
  {
    id: 108,
    refCodInstPagamento: 2,
    nmResponsavel: "Francisco Pacheco de Souza",
    codTipo: 2,
    codCpf: "***113999**",
    codDddTelefone: "11987687000",
    codRamal: "007",
    dsEmail: "franciscopacheco@sumup.com",
    dtAlteracao: null,
    dtCadastro: moment("2022-01-25T15:44:00Z"),
    dtFimVigencia: null,
    dtInicioVigencia: moment("2025-04-28T16:44:06.070Z"),
    codCargo: {
      id: 1,
      dsCargo: "D",
      nmCargo: "Diretor"
    }
  },
  {
    id: 109,
    refCodInstPagamento: 2,
    nmResponsavel: "Silvana da Silva Teles",
    codTipo: 3,
    codCpf: "***465000**",
    codDddTelefone: "238457466",
    codRamal: "5555",
    dsEmail: "silvana.teles@ecomm.com.br",
    dtAlteracao: null,
    dtCadastro: moment("2022-01-25T15:44:00Z"),
    dtFimVigencia: null,
    dtInicioVigencia: moment("2022-01-25T15:44:00Z"),
    codCargo: {
      id: 1,
      dsCargo: "D",
      nmCargo: "Diretor"
    }
  },
  {
    id: 110,
    refCodInstPagamento: 2,
    nmResponsavel: "Aparecida Geraldo Almeida",
    codTipo: 4,
    codCpf: "614400",
    codDddTelefone: "2384574774",
    codRamal: "7477",
    dsEmail: "",
    dtAlteracao: null,
    dtCadastro: moment("2022-01-25T15:44:00Z"),
    dtFimVigencia: null,
    dtInicioVigencia: moment("2022-01-25T15:44:00Z"),
    codCargo: {
      id: 1,
      dsCargo: "D",
      nmCargo: "Diretor"
    }
  },
  {
    id: 111,
    refCodInstPagamento: 2,
    nmResponsavel: "Luis Alves de Sousa",
    codTipo: 5,
    codCpf: "***963480**",
    codDddTelefone: "238457488",
    codRamal: "7488",
    dsEmail: "",
    dtAlteracao: null,
    dtCadastro: moment("2022-01-25T15:44:00Z"),
    dtFimVigencia: null,
    dtInicioVigencia: moment("2022-01-25T15:44:00Z"),
    codCargo: {
      id: 2,
      dsCargo: "T",
      nmCargo: "Técnico"
    }
  },
  {
    id: 113,
    refCodInstPagamento: 2,
    nmResponsavel: "Almir Sousa Campos",
    codTipo: 7,
    codCpf: "***456789**",
    codDddTelefone: "238457400",
    codRamal: null,
    dsEmail: "almir.campos@sumup.com.br",
    dtAlteracao: null,
    dtCadastro: moment("2022-01-25T15:44:00Z"),
    dtFimVigencia: null,
    dtInicioVigencia: moment("2022-01-25T15:44:00Z"),
    codCargo: {
      id: 1,
      dsCargo: "D",
      nmCargo: "Diretor"
    }
  },
  {
    id: 114,
    refCodInstPagamento: 2,
    nmResponsavel: "Alexandra de Cássia Rodrigues",
    codTipo: 7,
    codCpf: "",
    codDddTelefone: "238457500",
    codRamal: null,
    dsEmail: "alexandra.rodrigues@ecommit.com.br",
    dtAlteracao: null,
    dtCadastro: moment("2022-01-25T15:44:00Z"),
    dtFimVigencia: null,
    dtInicioVigencia: moment("2022-01-25T15:44:00Z"),
    codCargo: {
      id: 2,
      dsCargo: "T",
      nmCargo: "Técnico"
    }
  },
  {
    id: 115,
    refCodInstPagamento: 2,
    nmResponsavel: "Daniel de Almeida Sales",
    codTipo: 7,
    codCpf: "",
    codDddTelefone: "238457511",
    codRamal: null,
    dsEmail: "daniel.sales@sumup.com.br",
    dtAlteracao: null,
    dtCadastro: moment("2022-01-25T15:44:00Z"),
    dtFimVigencia: null,
    dtInicioVigencia: moment("2022-01-25T15:44:00Z"),
    codCargo: {
      id: 2,
      dsCargo: "T",
      nmCargo: "Técnico"
    }
  },
   {
    id: 116,
    refCodInstPagamento: 2,
    nmResponsavel: "Daniel de Almeida Sales – Institucional",
    codTipo: 7,
    codCpf: "***222555**",
    codDddTelefone: "238457511",
    codRamal: null,
    dsEmail: "daniel.sales@sumup.com.br",
    dtAlteracao: null,
    dtCadastro: moment("2022-01-25T15:44:00Z"),
    dtFimVigencia: null,
    dtInicioVigencia: moment("2022-01-25T15:44:00Z"),
    codCargo: {
      id: 3,
      dsCargo: "I",
      nmCargo: "Institucional"
    }
  },
  {
    id: 153,
    refCodInstPagamento: 2,
    nmResponsavel: "Rogério Arapecido Marinho",
    codTipo: 6,
    codCpf: "***593740**",
    codDddTelefone: "238457499",
    codRamal: null, // null no input
    dsEmail: "rogerio.marinho@sumup.com.br",
    dtAlteracao: null,
    dtCadastro: moment("2022-01-25T15:44:00Z"),
    dtFimVigencia: null,
    dtInicioVigencia: moment("2022-01-25T15:44:00Z"),
    codCargo: {
      id: 1,
      dsCargo: "D",
      nmCargo: "Diretor"
    }
  },
  {
    id: 330,
    refCodInstPagamento: 2,
    nmResponsavel: "Oscar Emboaba ",
    codTipo: 7,
    codCpf: "***358940**",
    codDddTelefone: "11989890898",
    codRamal: null, // null no input
    dsEmail: "oscar.emboaba@ecomm.com.br",
    dtAlteracao: null,
    dtCadastro: moment("2025-04-07T23:25:00Z"),
    dtFimVigencia: null,
    dtInicioVigencia: moment("2025-04-28T16:46:48.550Z"),
    codCargo: {
      id: 2,
      dsCargo: "T",
      nmCargo: "Técnico"
    }
  }
];
