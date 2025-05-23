// src/app/solicitacao.model.ts  (ou caminho desejado)

export interface RequestDimp {
    id: number;
    name: string;
    institution: string;
    user: string;
    dataRequest: string | Date;
    regulatory: string;
    type: string;
    status: {
        id: number;
        label: string;
        classes?: string;
    };
    parameters: any;
}

export const MANUAL_REQUEST_STATUS_OPTIONS = [
    {
        id: 0,
        label: 'Aguardando',
        classes: 'bg-secondary dark:bg-secondary-600 dark:text-secondary-50',
    },
    {
        id: 1,
        label: 'Em execução',
        classes: 'bg-yellow-500 dark:bg-yellow-600 dark:text-yellow-50',
    },
    {
        id: 2,
        label: 'Sucesso',
    },
    {
        id: 3,
        label: 'Com alertas',
    },
    {
        id: 4,
        label: 'Erro',
    },
    {
        id: 5,
        label: 'Arquivo não encontrado ou incompatível',
    },
];

export const getStatusById = (id: number) => MANUAL_REQUEST_STATUS_OPTIONS.find((el) => el.id === id);

export const MOCK_REQUESTS_DIMP: RequestDimp[] = [
    {
        id: 1023,
        name: 'Relatório de Vendas Trimestral',
        institution: 'Matriz SP',
        user: 'ana.souza',
        dataRequest: '2025-04-14T11:35:10Z',
        regulatory: 'DIMP',
        type: 'Relatório',
        status: MANUAL_REQUEST_STATUS_OPTIONS[2],
        parameters: {
            periodo: '2025-Q1',
            formato: 'PDF',
            detalhado: true,
        },
    },
    {
        id: 1022,
        name: 'Solicitação de Acesso - Novo Analista',
        institution: 'Filial RJ - TI',
        user: 'carlos.lima',
        dataRequest: '2025-04-14T09:15:00Z',
        regulatory: 'DIMP',
        type: 'Acesso',
        status: MANUAL_REQUEST_STATUS_OPTIONS[1],
        parameters: {
            novo_usuario: 'fernanda.costa',
            nivel_acesso: 'Analista Pleno',
            sistemas: ['ERP', 'CRM'],
        },
    },
    {
        id: 1021,
        name: 'Revisão Regulatória Anual - Produto XPTO',
        institution: 'Departamento Jurídico',
        user: 'roberto.alves',
        dataRequest: '2025-04-11T16:05:22Z',
        regulatory: 'DIMP',
        type: 'Revisão',
        status: MANUAL_REQUEST_STATUS_OPTIONS[5],
        parameters: {
            produto_id: 'XPTO-001',
            normativa: 'ANVISA-RDC-123',
            urgencia: 'Alta',
        },
    },
    {
        id: 1020,
        name: 'Solicitação de Acesso - Novo Analista',
        institution: 'Filial SP - TI',
        user: 'carlos.lima',
        dataRequest: '2025-04-11T15:30:00Z',
        regulatory: 'DIMP',
        type: 'Acesso',
        status: MANUAL_REQUEST_STATUS_OPTIONS[4],
        parameters: {
            novo_usuario: 'fernanda.costa',
            nivel_acesso: 'Analista Pleno',
            sistemas: ['ERP', 'CRM'],
        },
    },
    {
        id: 1019,
        name: 'Solicitação de Acesso - Novo Analista',
        institution: 'Filial SP - TI',
        user: 'carlos.lima',
        dataRequest: '2025-04-11T15:00:00Z',
        regulatory: 'DIMP',
        type: 'Acesso',
        status: MANUAL_REQUEST_STATUS_OPTIONS[3],
        parameters: {
            novo_usuario: 'fernanda.costa',
            nivel_acesso: 'Analista Pleno',
            sistemas: ['ERP', 'CRM'],
        },
    },
    {
        id: 1018,
        name: 'Solicitação de Acesso - Novo Analista',
        institution: 'Filial SP - TI',
        user: 'carlos.lima',
        dataRequest: '2025-04-11T14:30:00Z',
        regulatory: 'DIMP',
        type: 'Acesso',
        status: MANUAL_REQUEST_STATUS_OPTIONS[2],
        parameters: {
            novo_usuario: 'fernanda.costa',
            nivel_acesso: 'Analista Pleno',
            sistemas: ['ERP', 'CRM'],
        },
    },
    {
        id: 1017,
        name: 'Solicitação de Acesso - Novo Analista',
        institution: 'Filial SP - TI',
        user: 'carlos.lima',
        dataRequest: '2025-04-11T14:00:00Z',
        regulatory: 'DIMP',
        type: 'Acesso',
        status: MANUAL_REQUEST_STATUS_OPTIONS[1],
        parameters: {
            novo_usuario: 'fernanda.costa',
            nivel_acesso: 'Analista Pleno',
            sistemas: ['ERP', 'CRM'],
        },
    },
    {
        id: 1016,
        name: 'Solicitação de Acesso - Novo Analista',
        institution: 'Filial SP - TI',
        user: 'carlos.lima',
        dataRequest: '2025-04-11T13:30:00Z',
        regulatory: 'DIMP',
        type: 'Acesso',
        status: MANUAL_REQUEST_STATUS_OPTIONS[0],
        parameters: {
            novo_usuario: 'fernanda.costa',
            nivel_acesso: 'Analista Pleno',
            sistemas: ['ERP', 'CRM'],
        },
    },
];
